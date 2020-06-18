import { UserConstants } from '../actions/constants/user_constants';
import NameItem from '../config/sessionStorage';

const initialState = {
  loggingIn: false,
  loginSuccess: false,
  loginError: null,

  forgotPasswordPending: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: null,

  verifyOtpPending: false,
  verifyOtpSuccess: false,
  verifyOtpError: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loginSuccess: false,
        loginError: null,
      };
    case UserConstants.LOGIN_SUCCESS:
      if (action.payload !== null) {
        sessionStorage.setItem(
          NameItem.ACCESS_TOKEN,
          action.payload.access_token
        );
      }
      return {
        loggingIn: false,
        loginSuccess: true,
        loginError: null,
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
        logout: true,
      };

    case UserConstants.FORGOT_PASSWORD_PENDING:
      return {
        forgotPasswordPending: true,
        forgotPasswordSuccess: false,
        forgotPasswordError: null,
      };
    case UserConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        forgotPasswordPending: false,
        forgotPasswordSuccess: true,
        forgotPasswordError: null,
        reset_id: action.payload.reset_id,
      };
    case UserConstants.FORGOT_PASSWORD_ERROR:
      return {
        forgotPasswordPending: false,
        forgotPasswordSuccess: false,
        forgotPasswordError: action.payload,
      };

    case UserConstants.VERIFY_OTP_PENDING:
      return {
        verifyOtpPending: true,
        verifyOtpSuccess: false,
        verifyOtpError: null,
      };
    case UserConstants.VERIFY_OTP_SUCCESS:
      return {
        verifyOtpPending: false,
        verifyOtpSuccess: true,
        verifyOtpError: null,
      };
    case UserConstants.VERIFY_OTP_ERROR:
      return {
        verifyOtpPending: false,
        verifyOtpSuccess: false,
        verifyOtpError: action.payload,
      };
    default:
      return state;
  }
};

export default user;
