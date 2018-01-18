import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {NavigationActions} from 'react-navigation';
import createSagaMiddleware from 'redux-saga';
import {App} from "./RootView";
import rootReducers from './reducer';

const INITIAL_STATE = App.router.getStateForAction(NavigationActions.init())
const navReducer = (state = INITIAL_STATE, action) => {
    const newState = App.router.getStateForAction(action, state);
    return newState || state
}

const rootReducer = combineReducers({
    ...rootReducers,
    nav: navReducer,
});

export default function configureStore(initialState = {}) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    if (__DEV__) {
        middlewares.push(require('redux-immutable-state-invariant').default(), require('redux-logger').logger);
    }
    const storeEnhancers = compose(
        applyMiddleware(...middlewares)
    );

    let store = createStore(rootReducer, initialState, storeEnhancers);
    store.runSaga = sagaMiddleware.run;
    return store;
}