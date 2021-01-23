import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import { app } from './reducers/app';
import { ports } from './reducers/ports';

const reducers = combineReducers({
  app,
  ports
});

const middlewares = [ReduxThunk];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(reducers);
