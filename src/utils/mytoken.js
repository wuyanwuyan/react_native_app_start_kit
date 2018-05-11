import md5 from "react-native-md5";

// export const getParams = (params = {}) => {
//     let timestamp = Date.now().toString()
//
//     return {
//         ...params,
//         timestamp,i
//         code,
//         v: '1.4.0',
//         platform: 'm'
//     }
// }

export function codeTimestamp(timestamp) {
    timestamp = timestamp.toString();
    let code = md5.hex_md5(`${timestamp}9527${timestamp.substr(0,6)}`);
    return code;
}