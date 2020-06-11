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


function logout(){
  return dispatch => dispatch({type: UserConstants.LOGOUT})
}

export const userActions = {
  login, 
  logout
}