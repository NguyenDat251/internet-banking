import { TransferConstants } from '../actions/constants/customer/transfer';

const initialState = {
  findReceiverPending: false,
  findReceiverSuccess: false,
  findReceiverError: null,

  getRemindListPending: false,
  getRemindListSuccess: false,
  getRemindListError: null,
};

const transfer = (state = initialState, action) => {
  switch (action.type) {
    case TransferConstants.FIND_RECEIVER_PENDING:
      return {
        findReceiverPending: true,
        findReceiverSuccess: false,
        findReceiverError: null,
      };
    case TransferConstants.FIND_RECEIVER_SUCCESS:
      return {
        findReceiverPending: false,
        findReceiverSuccess: true,
        findReceiverError: null,
        full_name: action.payload.lastname + ' ' + action.payload.firstname,
      };
    case TransferConstants.FIND_RECEIVER_ERROR:
      return {
        findReceiverPending: false,
        findReceiverSuccess: false,
        findReceiverError: action.payload,
      };

    case TransferConstants.GET_REMIND_LIST_PENDING:
      return{
        getRemindListPending:  true,
        getRemindListSuccess: false,
        getRemindListError: null,
      }
    case TransferConstants.GET_REMIND_LIST_SUCCESS:
      return{
        getRemindListPending:  false,
        getRemindListSuccess: true,
        getRemindListError: null,
        remindList: action.payload["remind-list"]
      }
    case TransferConstants.GET_REMIND_LIST_ERROR:
      return{
        getRemindListPending:  false,
        getRemindListSuccess: false,
        getRemindListError: action.payload,
      }
    default:
      return state;
  }
};

export default transfer;
