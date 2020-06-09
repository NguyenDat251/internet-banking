import { BankAccountConstants } from '../actions/constants/customer/bank_account';

const initialState = {
  bankAccountPending: false,
  bankAccountSuccess: false,
  bankAccountError: null,
};

const bankAccount = (state = initialState, action) => {
  switch (action.type) {
    case BankAccountConstants.BANK_ACCOUNT_PENDING:
      return {
        bankAccountPending: true,
        bankAccountSuccess: false,
        bankAccountError: null,
      };
    case BankAccountConstants.BANK_ACCOUNT_REQUEST_SUCCESS:
      return {
        bankAccountPending: false,
        bankAccountSuccess: true,
        bankAccountError: null,
        credit_account: action.payload.credit_account,
        saving_account: action.payload.saving_account
      };
    case BankAccountConstants.BANK_ACCOUNT_REQUEST_FAIL:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };
    default:
      return state;
  }
};

export default bankAccount;
