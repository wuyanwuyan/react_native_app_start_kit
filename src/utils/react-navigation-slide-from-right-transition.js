//  https://github.com/Traviskn/react-navigation-slide-from-right-transition


import {Animated, Easing, I18nManager} from "react-native";

function forInitial(props) {
    const {navigation, scene} = props;

    const focused = navigation.state.index === scene.index;
    // If not focused, move the scene far away.
    const translate = focused ? 0 : 1000000;
    return {
        transform: [{translateX: translate}, {translateY: translate}],
    };
}

function forHorizontal(props) {
    const {layout, position, scene} = props;

    if (!layout.isMeasured) {
        return forInitial(props);
    }

    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];

    const width = layout.initWidth;
    const outputRange = I18nManager.isRTL
        ? ([-width, 0, width * 0.3])
        :
        ([width, 0, width * -0.3])
    ;

    // Add [index - 1, index - 0.99] to the interpolated opacity for screen transition.
    // This makes the screen's shadow to disappear smoothly.

    const translateY = 0;
    const translateX = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
        transform: [{translateX}, {translateY}],
    };
}

export default function getSlideFromRightTransitionConfig() {
    return {
        transitionSpec: {
            duration: 500,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: Animated.timing,
        },
        screenInterpolator: forHorizontal,
    };
}