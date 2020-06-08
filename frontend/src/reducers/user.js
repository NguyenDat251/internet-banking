import { UserConstants } from '../actions/constants/user_constants';

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
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loginSuccess: true,
      };
    case UserConstants.LOGIN_ERROR:
      return {
        loggingIn: false,
        loginError: action.payload,
      };
    default:
      return state;
  }
};

export default user;
