
const initialState = {
  devices: null,
  loggedIn: false
  
};

const Users = (state = initialState, action) => {
    switch (action.type) {

    case 'DEVICE_LIST':
      return {...state, devices: action.payload, loading: false};
      case 'LOGIN_SUCCESS':
        return {...state, loggedIn: action.payload};

      default:
        return state;
    }
}

export default Users