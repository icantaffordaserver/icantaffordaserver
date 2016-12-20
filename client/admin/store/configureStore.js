import { applyMiddleware, compose, createStore } from 'redux'
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const logger = createLogger();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise, logger),
      devTools({
        name: 'Shift Web Application',
        hostname: 'localhost',
        port: '8000',
        realtime: true
      })
    )

  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
