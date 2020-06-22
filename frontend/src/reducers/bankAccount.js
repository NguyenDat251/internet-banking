import { BankAccountConstants } from '../actions/constants/customer/bank_account';

const initialState = {
  bankAccountPending: false,
  bankAccountSuccess: false,
  bankAccountError: null,

  remindListPending: false,
  remindListSuccess: false,
  remindListError: null,

  createRemindListPending: false,
  createRemindListSuccess: false,
  createRemindListError: null,

  deleteRemindListPending: false,
  deleteRemindListSuccess: false,
  deleteRemindListError: null,

  updateRemindListPending: false,
  updateRemindListSuccess: false,
  updateRemindListError: null,

  getTransactionHistoryPending: false,
  getTransactionHistorySuccess: false,
  getTransactionHistoryError: null,
};

const bankAccount = (state = initialState, action) => {
  switch (action.type) {
    /* ---------------------------- get bank account ---------------------------- */
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
        saving_account: action.payload.saving_account,
      };
    case BankAccountConstants.BANK_ACCOUNT_REQUEST_FAIL:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };

    /* ----------------------------- get reming list ---------------------------- */
    case BankAccountConstants.GET_REMIND_LIST_PENDING:
      return {
        remindListPending: true,
        remindListSuccess: false,
        remindListError: null,
      };
    case BankAccountConstants.GET_REMIND_LIST_SUCCESS:
      return {
        getRemindListPending: false,
        getRemindListSuccess: true,
        getRemindListError: null,
        remindList: action.payload['remind-list'],
      };
    case BankAccountConstants.GET_REMIND_LIST_ERROR:
      return {
        remindListPending: false,
        remindListSuccess: false,
        remindListError: action.payload,
      };

    /* --------------------------- create remind list --------------------------- */
    case BankAccountConstants.CREATE_REMIND_LIST_PENDING:
      return {
        createRemindListPending: true,
        createRemindListSuccess: false,
        createRemindListError: null,
      };
    case BankAccountConstants.CREATE_REMIND_LIST_SUCCESS:
      return {
        createRemindListPending: false,
        createRemindListSuccess: true,
        createRemindListError: null,
      };
    case BankAccountConstants.CREATE_REMIND_LIST_ERROR:
      return {
        createRemindListPending: false,
        createRemindListSuccess: false,
        createRemindListError: action.payload,
      };

    /* --------------------------- delete remind list --------------------------- */
    case BankAccountConstants.DELETE_REMIND_LIST_PENDING:
      return {
        deleteRemindListPending: true,
        deleteRemindListSuccess: false,
        deleteRemindListError: null,
      };
    case BankAccountConstants.DELETE_REMIND_LIST_SUCCESS:
      return {
        deleteRemindListPending: false,
        deleteRemindListSuccess: true,
        deleteRemindListError: null,
      };
    case BankAccountConstants.DELETE_REMIND_LIST_ERROR:
      return {
        deleteRemindListPending: false,
        deleteRemindListSuccess: false,
        deleteRemindListError: action.payload,
      };

    /* --------------------------- update remind list --------------------------- */
    case BankAccountConstants.UPDATE_REMIND_LIST_PENDING:
      return {
        updateRemindListPending: true,
        updateRemindListSuccess: false,
        updateRemindListError: null,
      };
    case BankAccountConstants.UPDATE_REMIND_LIST_SUCCESS:
      return {
        updateRemindListPending: false,
        updateRemindListSuccess: true,
        updateRemindListError: null,
      };
    case BankAccountConstants.UPDATE_REMIND_LIST_ERROR:
      return {
        updateRemindListPending: false,
        updateRemindListSuccess: false,
        updateRemindListError: action.payload,
      };

    /* ------------------------- get transaction history ------------------------ */
    case BankAccountConstants.GET_TRANSACTION_HISTORY_PENDING:
      return {
        getTransactionHistoryPending: true,
        getTransactionHistorySuccess: false,
        getTransactionHistoryError: null,
      };
    case BankAccountConstants.GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        getTransactionHistoryPending: false,
        getTransactionHistorySuccess: true,
        getTransactionHistoryError: null,
        transactionHistory: action.payload
      };
    case BankAccountConstants.GET_TRANSACTION_HISTORY_ERROR:
      return {
        getTransactionHistoryPending: false,
        getTransactionHistorySuccess: false,
        getTransactionHistoryError: action.payload,
      };
    default:
      return state;
  }
};

export default bankAccount;
