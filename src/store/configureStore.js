import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import networkPromiseMiddleware from '../middleware/networkMiddleware';
import coreReducers from '../core/coreReducers';
import fireAndForgetMiddleware from '../middleware/fireAndForgetMiddleware';
import replayActionMiddleware from '../middleware/replayActionMiddleware';

const configureStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    core: coreReducers,
  });

  let composeEnhancers = compose;

  const middleware = [
    thunk,
    networkPromiseMiddleware,
    fireAndForgetMiddleware,
    replayActionMiddleware
  ];

  const enhancers = [applyMiddleware(...middleware)];

  return createStore(rootReducer, initialState, composeEnhancers(...enhancers));
};

export default configureStore;
