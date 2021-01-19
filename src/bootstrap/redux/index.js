import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import newsReducer from '../../features/newsDisplay/redux/newsReducers'

const reducers = combineReducers({ newsReducer })

export const store = createStore(reducers, applyMiddleware(thunk))