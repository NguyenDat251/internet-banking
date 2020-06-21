import { EmpConstants } from '../actions/constants/employee/emp_constants';
import NameItem from '../config/sessionStorage';

const initialState = {
  loggingIn: false,
  loginSuccess: false,
  loginError: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case EmpConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loginSuccess: false,
        loginError: null,
      };
    case EmpConstants.LOGIN_SUCCESS:
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
    case EmpConstants.LOGIN_ERROR:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };
    case EmpConstants.LOGOUT:
      sessionStorage.removeItem(NameItem.ACCESS_TOKEN);
      return {
        logout: true,
      };
    default:
      return state;
  }
};

export default user;
