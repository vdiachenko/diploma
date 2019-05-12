import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import reducer from '../reducer'
import logger from '../middlewares/logger'
import api from '../middlewares/api'
import uniqId from '../middlewares/uniq-id'
import history from '../history'

const enhancer = applyMiddleware(
    thunk,
    routerMiddleware(history),
    logger,
    api,
    uniqId
)
const store = createStore(reducer, enhancer)

window.store = store

export default store
