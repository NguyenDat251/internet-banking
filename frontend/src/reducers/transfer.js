import { TransferConstants } from '../actions/constants/customer/transfer';

const initialState = {
  findReceiverPending: false,
  findReceiverSuccess: false,
  findReceiverError: null,
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
    default:
      return state;
  }
};

export default transfer;
