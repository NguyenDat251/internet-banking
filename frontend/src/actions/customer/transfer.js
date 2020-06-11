import { TransferConstants } from '../constants/customer/transfer';
import {TransferServices} from '../../services/apis/customer/transfer'


function transferLocal(name, from_credit_number, to_credit_number, amount, fee_payer, message){
  return (dispatch) => {
    dispatch(request());
    TransferServices.transferLocal(name, from_credit_number, to_credit_number, amount, fee_payer, message)
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

function verifyOtp(id, otp){
  return (dispatch) => {
    dispatch(request());
    TransferServices.verifyOtp(id, otp)
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

function findReceiver(credit_number){
  return (dispatch) => {
    dispatch(request());
    TransferServices.findReceiver(credit_number)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){ return{type: TransferConstants.FIND_RECEIVER_PENDING}};
    function success(res){return{type: TransferConstants.FIND_RECEIVER_SUCCESS, payload: res}};
    function failure(error){return{type: TransferConstants.FIND_RECEIVER_ERROR, payload: error}};
};



export const transferActions = {
  transferLocal,
  verifyOtp,
  findReceiver
}