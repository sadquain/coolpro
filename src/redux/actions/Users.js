import app, { db, auth } from "../../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import * as api from "../../constants/Api.js";
import { API, removeSession, storeSession } from "../../services";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getIdTokenResult,
} from "firebase/auth";
import moment from "moment";

export const list = () => {
  return (dispatch) => {
    return API.execute(api.USERS_LISTS).then(
      (response) => {
        return response;
      },
      (error) => {
        //   dispatch({type: T.RECEPTIONIST_ERROR, payload: error});
        return error;
      }
    );
  };
};

export const registeredDevices = (uid) => {
  return async (dispatch) => {
    try {
      if (!uid) {
        console.error("Error: UID is undefined");
        return [];
      }

      const devicesRef = collection(db, "registeredDevices");
      const querySnapshot = await getDocs(
        query(devicesRef, where("users", "array-contains-any", [uid]))
      );
      const data = querySnapshot.docs.map((doc) => doc.id);

      dispatch({
        type: "DEVICE_LIST",
        payload: data,
      });
      return data;
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching device data:", error);
      return [];
    }
  };
};

export const fetchGateway = (macAddress) => {
  return async (dispatch) => {
    try {
      const collectionRef = collection(db, "deviceData");

      const querySnapshot = await getDocs(collectionRef);
      let reversedData = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === macAddress) {
          const gatewayData = doc.data().gatewayData || [];
          reversedData = gatewayData.reverse();
        }
      });

      dispatch({
        type: "DEVICE_LIST",
        payload: reversedData,
      });
      return reversedData;
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
};

export const loginAdmin = (email, password) => {
  return async (dispatch) => {
    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user's ID token
      const idToken = await userCredential.user.getIdToken();
      return API.execute(api.SIGN_IN, {
        data: { email, password, idToken },
      }).then((res) => {
        // Dispatch login success action
        dispatch({ type: "LOGIN_SUCCESS", payload: true,
      });

        // Verify the ID token
        verifyToken(idToken);
        return res;
      });
    } catch (error) {
      console.error("Error logging in:", error);
      // Dispatch login failure action with the error message
      dispatch({ type: "LOGIN_FAILURE", error: error.message });
    }
  };
};

const verifyToken = (idToken) => {
  // Verify the user's ID token
  getIdTokenResult(auth.currentUser)
    .then((idTokenResult) => {
      // Token verification successful
      // localStorage.setItem("token", idTokenResult.token);
      storeSession(auth.currentUser);
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
    });
};

export const logout = () => {
  return (dispatch) => {
    removeSession();
    return true;
  };
}
