import server from "../config/server";
import ToastUtil from "./ToastUtil";

export function fetchGet(url, query = {}, option = {}) {
    let isOk;
    let serializeQuery = serialize(query);
    let finalUrl = `${server.backend}${url}` + (serializeQuery ? `?${serializeQuery}` : '');
    __DEV__ && console.log('%c start fetchGet:  ' + finalUrl, 'color: green');


    let headers = {
    };

    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            headers
        })
            .then((response) => {
                isOk = !!response.ok;
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                if (error.message === 'Network request failed') {
                    ToastUtil.showShort('网络发生错误，请重试');
                }
                reject(error);
            });
    });
}


export function fetchPost(url, data = {}, type = 'json') {
    let isOk;

    let headers = {};

    if (type === 'json') {
        headers['Content-Type'] = 'application/json';
    }

    let finalUrl = `${server.backend}${url}`;

    __DEV__ && console.log('%c start fetchPost:  ' + finalUrl, ' data: ', data, 'color: green');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        })
            .then((response) => {
                isOk = !!response.ok;
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                if (error.message === 'Network request failed') {
                    ToastUtil.showShort('网络发生错误，请重试');
                }
                reject(error);
            });
    });
}

export function fetchPut(url) {

}

export function fetchDelete(url) {

}

export function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
