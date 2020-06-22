import { AdminConstants } from '../actions/constants/admin/admin_constants';
import NameItem from '../config/sessionStorage';

const initialState = {
  loggingIn: false,
  loginSuccess: false,
  loginError: null,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case AdminConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loginSuccess: false,
        loginError: null,
      };
    case AdminConstants.LOGIN_SUCCESS:
      if (action.payload !== null) {
        sessionStorage.setItem(
          NameItem.ACCESS_TOKEN,
          action.payload.access_token
        );
        sessionStorage.setItem(
            NameItem.REFRESH_TOKEN,
            action.payload.refresh_token
          );
      }
      return {
        loggingIn: false,
        loginSuccess: true,
        loginError: null,
      };
    case AdminConstants.LOGIN_ERROR:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };
    case AdminConstants.LOGOUT:
      sessionStorage.removeItem(NameItem.ACCESS_TOKEN);
      sessionStorage.removeItem(NameItem.REFRESH_TOKEN)
      return {
        logout: true,
      };
    default:
      return state;
  }
};

export default admin;
