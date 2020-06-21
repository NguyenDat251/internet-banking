import user from './user'
import bankAccount from './bankAccount'
import transfer from './transfer'
import employee from './employee'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    customer: user,
    bankAccount: bankAccount,
    transfer: transfer,
    employee: employee
})

export default rootReducer