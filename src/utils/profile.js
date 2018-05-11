// 保存用户的基本信息
import {DeviceEventEmitter} from "react-native";
import store from "react-native-simple-store";
import {fetchGet} from "./fetchUtil";

let userInfo = null;

function getAsync() {
    return store.get('userInfo').then((data) => {
        userInfo = data;
    })
}

function get() {
    return userInfo;
}

function loginWithToken(token, user) {
    let oldUser = userInfo ? (userInfo.user || {}) : {}
    login({token, user: {...oldUser, ...user}});
}

function login(data) {
    userInfo = data;
    store.update('userInfo', data);
    DeviceEventEmitter.emit('loginChange', data);
}

function logout() {
    userInfo = null;
    store.delete('userInfo');
    DeviceEventEmitter.emit('loginChange', null);
}

export default {
    get, getAsync, login, loginWithToken, logout
}