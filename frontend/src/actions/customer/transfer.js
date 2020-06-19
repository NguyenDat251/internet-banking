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
    function request(){ return{type: TransferConstants.TRANSFER_LOCAL_PENDING}};
    function success(res){return{type: TransferConstants.TRANSFER_LOCAL_SUCCESS, payload: res}};
    function failure(error){return{type: TransferConstants.TRANSFER_LOCAL_ERROR, payload: error}};
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

function getRemindList(){
  return (dispatch) => {
    dispatch(request());
    TransferServices.getRemindList()
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){ return{type: TransferConstants.GET_REMIND_LIST_PENDING}};
    function success(res){return{type: TransferConstants.GET_REMIND_LIST_SUCCESS, payload: res}};
    function failure(error){return{type: TransferConstants.GET_REMIND_LIST_ERROR, payload: error}};
}

function saveRemindList(credit_number, remind_name, bank_name){
  return (dispatch) => {
    dispatch(request());
    TransferServices.saveRemindList(credit_number, remind_name, bank_name)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){ return{type: TransferConstants.SAVE_REMIND_LIST_PENDING}};
    function success(res){return{type: TransferConstants.SAVE_REMIND_LIST_SUCCESS, payload: res}};
    function failure(error){return{type: TransferConstants.SAVE_REMIND_LIST_ERROR, payload: error}};
}



export const transferActions = {
  transferLocal,
  verifyOtp,
  findReceiver,
  getRemindList,
  saveRemindList
}