import {Platform, ToastAndroid} from "react-native";
import Toast from "react-native-root-toast";

const showShort = (content) => {
    if (!content) {
        return;
    }
    if (Platform.OS === 'ios') {
        Toast.show(content.toString(), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    } else {
        ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
    }
};

const showLong = (content) => {
    if (Platform.OS === 'ios') {
        Toast.show(content.toString(), {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    } else {
        ToastAndroid.show(content.toString(), ToastAndroid.LONG);
    }
};

export default {
    showShort,
    showLong
};
