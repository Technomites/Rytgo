import {combineReducers, compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

// Reducers
import {rootReducer} from '../reducers/index';

export const Store = createStore(rootReducer, applyMiddleware(thunk));
