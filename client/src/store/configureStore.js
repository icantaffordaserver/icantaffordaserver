/**
 * Created by alexandermann on 2016-12-14.
 */
import {applyMiddleware, createStore, compose} from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const logger           = createLogger();

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, promise, logger),
            devTools({realtime: true})
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
