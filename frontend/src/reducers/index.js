import user from './user'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    customer: user
})

export default rootReducer