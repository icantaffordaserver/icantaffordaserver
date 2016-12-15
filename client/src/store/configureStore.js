/**
 * Created by alexandermann on 2016-12-14.
 */
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const logger           = createLogger();
    const composeEnhancers = composeWithDevTools({
        name: 'Shift Admin Panel',
        realtime: true,
        port: 8000
    });

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, promise, logger)
        )
    );

    if (module.hot) {
        // Enable hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
