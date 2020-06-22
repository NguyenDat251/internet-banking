import { AdminConstants } from '../constants/admin/admin_constants';
import {AdminServices} from '../../services/apis/admin/admin'


function login(username, password){
    return (dispatch) => {
      dispatch(request());
      AdminServices.login(username, password)
      .then(
        res =>{
          dispatch(success(res))
        }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){return{type: AdminConstants.LOGIN_REQUEST}};
    function success(res){return{type: AdminConstants.LOGIN_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.LOGIN_ERROR, payload: error}};
};

function logout(){
  return dispatch => dispatch({type: AdminConstants.LOGOUT})
}

export const AdminActions = {
  login, 
  logout,
}