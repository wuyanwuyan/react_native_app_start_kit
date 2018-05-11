import {NavigationActions} from 'react-navigation';

const reset = (navigation, routeName, params = {}) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName, params})]
    });
    navigation.dispatch(resetAction);
};

export default {
    reset
};
