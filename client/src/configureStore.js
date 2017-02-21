import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import adminReducer from './admin/adminReducer';
import userReducer from './user/userReducer';
import sharedReducer from './shared/redux/sharedReducer';
import mySaga from './user/components/Dashboard/sagas';
import root from './shared/redux/auth/sagas';

const allReducers = {
  ...userReducer,
  ...adminReducer,
  ...sharedReducer,
};
const rootReducer = combineReducers(allReducers);

export default function configureStore(initialState) {
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, thunk, promise, logger),
      (process.env.NODE_ENV === 'development') ?
        devTools({
          name: 'Shift Web Application',
          hostname: 'localhost',
          port: '8000',
          realtime: true,
        }) : null,
    ),
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('./admin/adminReducer', () => {
      const nextRootReducer = require('./admin/adminReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run(root);

  return store;
}
