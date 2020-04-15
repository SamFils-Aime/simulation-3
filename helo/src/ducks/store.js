import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import postsReducer from './reducers/postsreducer';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));