import { UserConstants } from './constants/user_constants';
import {UserService} from '../services/apis/user'


function login(username, password){
    return (dispatch) => {
      dispatch(request());
      UserService.login(username, password)
      .then(
        res =>{
          dispatch(success(res))
        }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){return{type: UserConstants.LOGIN_REQUEST}};
    function success(res){return{type: UserConstants.LOGIN_SUCCESS, payload: res}};
    function failure(error){return{type: UserConstants.LOGIN_ERROR, payload: error}};
};

function forgotPassword(username, idNumber){
  return (dispatch) => {
    dispatch(request());
    UserService.forgotPassword(username, idNumber)
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error))
    }) 
  }
  function request(){return{type: UserConstants.FORGOT_PASSWORD_PENDING}};
  function success(res){return{type: UserConstants.FORGOT_PASSWORD_SUCCESS, payload: res}};
  function failure(error){return{type: UserConstants.FORGOT_PASSWORD_ERROR, payload: error}};
}

function verifyOtp(reset_id, otp){
  return (dispatch) => {
    dispatch(request());
    UserService.verifyOtp(reset_id, otp)
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error))
    }) 
  }
  function request(){return{type: UserConstants.VERIFY_OTP_PENDING}};
  function success(res){return{type: UserConstants.VERIFY_OTP_SUCCESS, payload: res}};
  function failure(error){return{type: UserConstants.VERIFY_OTP_ERROR, payload: error}};
}

function changePassword(old_password, new_password, confirm_new_password){
  return (dispatch) => {
    dispatch(request());
    UserService.changePassword(old_password, new_password, confirm_new_password)
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error))
    }) 
  }
  function request(){return{type: UserConstants.CHANGE_PASSWORD_PENDING}};
  function success(res){return{type: UserConstants.CHANGE_PASSWORD_SUCCESS, payload: res}};
  function failure(error){return{type: UserConstants.CHANGE_PASSWORD_ERROR, payload: error}};
}



function logout(){
  return dispatch => dispatch({type: UserConstants.LOGOUT})
}

export const userActions = {
  login, 
  logout,
  forgotPassword,
  verifyOtp,
  changePassword
}