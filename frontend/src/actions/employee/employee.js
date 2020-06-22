import { EmpConstants } from '../constants/employee/emp_constants';
import {EmpServices} from '../../services/apis/employee/employee'


function login(username, password){
    return (dispatch) => {
      dispatch(request());
      EmpServices.login(username, password)
      .then(
        res =>{
          dispatch(success(res))
        }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){return{type: EmpConstants.LOGIN_REQUEST}};
    function success(res){return{type: EmpConstants.LOGIN_SUCCESS, payload: res}};
    function failure(error){return{type: EmpConstants.LOGIN_ERROR, payload: error}};
};

function logout(){
  return dispatch => dispatch({type: EmpConstants.LOGOUT})
}

export const employeeActions = {
  login, 
  logout,
}