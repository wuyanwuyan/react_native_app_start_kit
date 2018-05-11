import React from "react";
import {
    StyleSheet,
    View,
    Platform,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    StatusBar
} from "react-native";
import {fetchGet, fetchPost} from '../../utils/fetchUtil';
import Profile from '../../utils/profile';
import ToastUtil from '../../utils/ToastUtil';
import {Phone_reg} from "../../config/constants";


let isFetchingSMS_code = false;
export default class LoginRegister extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '登录/注册',
            headerBackTitle: null,
            headerBackTitleStyle: {
                color: '#2f2e33'
            },
            headerStyle: {
                backgroundColor: "#2f2e33"
            },
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            sms_code: '',
            countDown: 0,
            btnDisabled: true,
            keyboardSpace: 45,
        }
    }

    _validate = () => {
        const {phone, sms_code, btnDisabled} = this.state;
        let newBtnDisabled = false;

        if (!phone || !sms_code) {
            newBtnDisabled = true;
        }

        if (!Phone_reg.test(phone)) {
            newBtnDisabled = true;
        }

        if (newBtnDisabled !== btnDisabled) {
            this.setState({btnDisabled: newBtnDisabled})
        }

    }

    _enterApp = () => {
        const {phone, sms_code} = this.state;
        fetchPost('/api/ly/currency/login', {mobile: phone, code: sms_code}).then(data => {
            if (data.code !== 200) {
                ToastUtil.showShort(data.message);
                return
            }
            console.log('login data:  ', data);
            Profile.login(data.data);
            this.props.navigation.goBack();
        })
    }

    timeKey = null;
    _getCacha = () => {
        if (isFetchingSMS_code) return;

        const {phone} = this.state;

        if (!phone || !Phone_reg.test(phone)) {
            ToastUtil.showShort('请填写正确手机号');
            return;
        }

        // 防止快速点两下，发两次请求
        isFetchingSMS_code = true;
        fetchGet('/api/common/validate', {mobile: phone}, {headers: {'User-Agent': 'YueHuiBa'}}).then(data => {
            isFetchingSMS_code = false;
            if (data.code !== 200) {
                ToastUtil.showShort(data.message);
                return;
            }

            this.setState({countDown: 60});
            this.timeKey = setInterval(() => {
                let newCountDown = this.state.countDown - 1;
                this.setState({countDown: newCountDown});
                if (newCountDown <= 0) {
                    clearInterval(this.timeKey);
                }
            }, 1000);
        })
    }

    _keyboardDidShow = () => {
        this.setState({keyboardSpace: -20});
    }

    _keyboardDidHide = () => {
        this.setState({keyboardSpace: 45});
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.timeKey && clearInterval(this.timeKey);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    _onChangeText = (type) => (value) => {
        this.setState({[type]: value}, this._validate);
    }

    render() {

        const {phone, sms_code, countDown, btnDisabled, keyboardSpace} = this.state;

        return (
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}
                        contentContainerStyle={{alignItems: 'center'}}>
                <Image source={require('../../assets/logo.png')} style={[styles.logoImg, {marginTop: keyboardSpace}]}/>

                <StatusBar barStyle="light-content"/>

                <View style={{width: '100%', paddingHorizontal: 55, marginTop: 30, marginBottom: 60}}>

                    <View style={[styles.inputBorder, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20
                    }]}>
                        <TextInput
                            value={phone}
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="请输入手机号"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            maxLength={13}
                            onChangeText={this._onChangeText('phone')}
                        />
                        {countDown <= 0 ? <TouchableOpacity onPress={this._getCacha} style={styles.getCaptcha}>
                                <Text style={{color: '#666666'}}>获取验证码</Text>
                            </TouchableOpacity> :
                            <View style={styles.getCaptcha}><Text
                                style={{color: '#666666'}}>{`重新发送(${countDown}s)`}</Text></View>
                        }
                    </View>

                    <TextInput
                        value={sms_code}
                        style={[styles.inputBorder, styles.input]}
                        keyboardType="numeric"
                        placeholder="请输入短信验证码"
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        maxLength={8}
                        onChangeText={this._onChangeText('sms_code')}
                    />

                    <TouchableOpacity onPress={this._enterApp} activeOpacity={0.9}
                                      style={styles.btnContainer}>
                        <Text style={{fontSize: 17, color: 'white', textAlign: 'center', width: '100%'}}>进入币盈</Text>
                    </TouchableOpacity>

                    <Text style={{color: '#FF6C00', fontSize: 12, marginTop: 5}}>{`   *未注册手机验证后自动登录`}</Text>

                </View>

            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoImg: {
        width: 75,
        height: 75,
        resizeMode: 'stretch',
        marginBottom: 22
    },
    getCaptcha: {
        justifyContent: 'center',
        paddingVertical: 4,
        marginLeft: 'auto',
        paddingHorizontal: 8,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: '#CDCBCC',
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 10,
    },
    inputBorder: {
        width: '100%',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#CDCBCC',
    },
    btnContainer: {
        marginTop: 35,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 20,

        backgroundColor: '#FF6C00'
    },
    btn: {
        width: '100%',
        height: 44,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})