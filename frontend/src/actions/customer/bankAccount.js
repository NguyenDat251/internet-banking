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
        dispatch(failure(error))
      }) 
    };
};

const request = () => ({type: BankAccountConstants.BANK_ACCOUNT_PENDING});
const success = (res) => ({type: BankAccountConstants.BANK_ACCOUNT_REQUEST_SUCCESS, payload: res});
const failure = (error) => ({type: BankAccountConstants.BANK_ACCOUNT_REQUEST_FAIL, payload: error});

export const bankAccountActions = {
  getBankAccount
}