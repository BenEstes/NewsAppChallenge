import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import newsReducer from '../../features/newsDisplay/redux/newsReducers'

import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({ newsReducer })

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))