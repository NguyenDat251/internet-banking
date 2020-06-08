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
};

const request = () => ({type: UserConstants.LOGIN_REQUEST});
const success = (res) => ({type: UserConstants.LOGIN_SUCCESS, payload: res});
const failure = (error) => ({type: UserConstants.LOGIN_ERROR, payload: error});

export const userActions = {
  login
}