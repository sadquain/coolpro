import API from "./API";


const storeSession = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    const token = data.accessToken;
    localStorage.setItem("token", token);
    localStorage.setItem("user", jsonValue);
  } catch (e) {
    throw e;
  }
};

const getSession = async () => {
  try {
    const jsonValue = await localStorage.getItem("user");
    return JSON.parse(jsonValue);
  } catch (e) {
    throw e;
  }
};

const removeSession = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (e) {
    throw e;
  }
};

const validateEmail = (email) => {
  let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  return pattern.test(email);
};

const validatePassword = (password) => {
  let pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/);

  return pattern.test(password);
};



export {
  API,
  storeSession,
  getSession,
  removeSession,
  validateEmail,
  validatePassword,
};
