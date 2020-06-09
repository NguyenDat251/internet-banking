import user from './user'
import bankAccount from './bankAccount'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    customer: user,
    bankAccount: bankAccount
})

export default rootReducer