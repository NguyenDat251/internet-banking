import { TransferConstants } from '../constants/customer/transfer';
import {TransferServices} from '../../services/apis/customer/transfer'


function transferLocal(){
  return (dispatch) => {
    dispatch(request());
    TransferServices.transferLocal
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){ return{type: TransferConstants.TRANSFER_PENDING}};
    function success(res){return{type: TransferConstants.TRANSFER_SUCCESS, payload: res}};
    function failure(error){return{type: TransferConstants.TRANSFER_ERROR, payload: error}};
};

function verifyOtp(){
  return (dispatch) => {
    dispatch(request());
    TransferServices.transferLocal
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){ return{type: TransferConstants.OTP_PENDING}};
    function success(res){return{type: TransferConstants.OTP_SUCCESS, payload: res}};
    function failure(error){return{type: TransferConstants.OTP_ERROR, payload: error}};
};



export const transferActions = {
  transferLocal,
  verifyOtp
}