import user from './user'
import bankAccount from './bankAccount'
import transfer from './transfer'
import employee from './employee'
import admin from './admin'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    customer: user,
    bankAccount: bankAccount,
    transfer: transfer,
    employee: employee,
    admin: admin
})

export default rootReducer  