import React from "react";
import {Provider} from "react-redux";
import RootView from "./RootView";
import configureStore from "./configureStore";

import rootSaga from "./sagas";

let store = configureStore({});
store.runSaga(rootSaga);

export default () => (
    <Provider store={store}>
        <RootView/>
    </Provider>
)