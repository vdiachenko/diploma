import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import user from './user'
import users from './users'
import history from '../history'

export default combineReducers({
    auth,
    user,
    users,
    router: connectRouter(history),
})
