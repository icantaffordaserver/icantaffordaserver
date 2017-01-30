import { applyMiddleware, compose, createStore } from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../admin/adminReducer';

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, promise, logger),
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
    module.hot.accept('../admin/adminReducer', () => {
      const nextRootReducer = require('../admin/adminReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
