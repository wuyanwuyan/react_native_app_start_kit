import { AppRegistry } from 'react-native';
import App from './src/index';

import {setJSExceptionHandler, getJSExceptionHandler,setNativeExceptionHandler} from 'react-native-exception-handler';

const customErrorHandler = (error, isFatal) => {
    // Logic for reporting to devs
    // Example : Log issues to github issues using github apis.

    console.log(error, isFatal); // example

};

const previousErrorHandler = getJSExceptionHandler(); // by default u will get the red screen error handler here

const errorHandler = (e, isFatal) => {
    customErrorHandler(e, isFatal);
    previousErrorHandler(e, isFatal);
};

// We will still see the error screen, but our customErrorHandler() function will be called
setJSExceptionHandler(errorHandler);


setNativeExceptionHandler((exceptionString) => {
    // This is your custom global error handler
    // You do stuff likehit google analytics to track crashes.
    // or hit a custom api to inform the dev team.
    //NOTE: alert or showing any UI change via JS
    //WILL NOT WORK in case of NATIVE ERRORS.
});

// getJSExceptionHandler gives the currently set JS exception handler




AppRegistry.registerComponent('react_native_app_start_kit', () => App);
