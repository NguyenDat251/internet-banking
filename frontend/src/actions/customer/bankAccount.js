import { BankAccountConstants } from '../constants/customer/bank_account';
import {BankAccountServices} from '../../services/apis/customer/bankAccount'


function getBankAccount(){
    return (dispatch) => {
      dispatch(request());
      BankAccountServices.getListAccount()
      .then(
        res =>{
          dispatch(success(res))
        }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: BankAccountConstants.BANK_ACCOUNT_PENDING}};
    function success(res){return{type: BankAccountConstants.BANK_ACCOUNT_REQUEST_SUCCESS, payload: res}};
    function failure(error){return{type: BankAccountConstants.BANK_ACCOUNT_REQUEST_FAIL, payload: error}};
};

function getRemindList(){
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.getRemindList()
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error.response.data))
    }) 
  };
  function request(){ return{type: BankAccountConstants.GET_REMIND_LIST_PENDING}};
  function success(res){return{type: BankAccountConstants.GET_REMIND_LIST_SUCCESS, payload: res}};
  function failure(error){return{type: BankAccountConstants.GET_REMIND_LIST_ERROR, payload: error}};
};

function createRemindList(credit_number, remind_name, partner_code){
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.createRemindList(credit_number, remind_name, partner_code)
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error.response.data))
    }) 
  };
  function request(){ return{type: BankAccountConstants.CREATE_REMIND_LIST_PENDING}};
  function success(res){return{type: BankAccountConstants.CREATE_REMIND_LIST_SUCCESS, payload: res}};
  function failure(error){return{type: BankAccountConstants.CREATE_REMIND_LIST_ERROR, payload: error}};
};

function deleteRemindList(remind_id){
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.deleteRemindList(remind_id)
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error.response.data))
    }) 
  };
  function request(){ return{type: BankAccountConstants.DELETE_REMIND_LIST_PENDING}};
  function success(res){return{type: BankAccountConstants.DELETE_REMIND_LIST_SUCCESS, payload: res}};
  function failure(error){return{type: BankAccountConstants.DELETE_REMIND_LIST_ERROR, payload: error}};
};


export const bankAccountActions = {
  getBankAccount,
  getRemindList, 
  createRemindList,
  deleteRemindList
}