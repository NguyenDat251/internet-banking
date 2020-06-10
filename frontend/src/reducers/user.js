import { UserConstants } from '../actions/constants/user_constants';
import NameItem from '../config/sessionStorage'

const initialState = {
  loggingIn: false,
  loginSuccess: false,
  loginError: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loginSuccess: false,
        loginError: null
      };
    case UserConstants.LOGIN_SUCCESS:
      if(action.payload !== null){
        sessionStorage.setItem(NameItem.ACCESS_TOKEN, action.payload.access_token);
      }
      return {
        loggingIn: false,
        loginSuccess: true,
        loginError: null
      };
    case UserConstants.LOGIN_ERROR:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };
    case UserConstants.LOGOUT:
      sessionStorage.removeItem(NameItem.ACCESS_TOKEN);
      return {
        logout: true
      }
    default:
      return state;
  }
};

export default user;
