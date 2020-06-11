import user from './user'
import bankAccount from './bankAccount'
import transfer from './transfer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    customer: user,
    bankAccount: bankAccount,
    transfer: transfer
})

export default rootReducer