import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "../../utils/profile";
import {Split_color} from "../../config/constants";
import cStyles from "../../styles/common";
import AboutThisApp from "./AboutThisApp";
import MyInfo from "./MyInfo";
import DeviceInfo from "react-native-device-info";



export default class Mine extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '我的',
            tabBarIcon: ({tintColor}) => (
                <Icon name="account" size={25} color={tintColor}/>
            ),
            // headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        DeviceEventEmitter.addListener('loginChange', (data) => {
            this.forceUpdate();
        });
    }

    _login = () => {
        let profile = Profile.get();
        profile ? this.props.navigation.navigate('MyInfo') : this.props.navigation.navigate('LoginRegister');
    }


    _aboutThisApp = () => {
        this.props.navigation.navigate('AboutThisApp');
    }

    _contractUs = () => {

    }

    render() {

        let profile = Profile.get();

        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground style={{width: '100%', height: 225, justifyContent: 'center'}}
                                 source={require('../../assets/banner.png')} resizeMode='stretch'>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={this._login}
                                      activeOpacity={0.8}>
                        <Image source={require('../../assets/head.png')} style={styles.avater}></Image>
                        {
                            profile ?
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <Text style={{color: 'white'}}>{profile.phone}</Text>
                                </View> :
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <Text style={{color: 'white'}}>请点击登录</Text>
                                </View>
                        }
                    </TouchableOpacity>

                </ImageBackground>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity onPress={this._aboutThisApp} activeOpacity={0.8}>
                        <View style={[styles.section]}>
                            <Image source={require('../../assets/about.png')} style={styles.labelImg}/>
                            <Text style={{fontSize: 16}}>关于币盈</Text>
                            <View style={{marginLeft: 'auto'}}>
                                <Ionicons name='ios-arrow-forward' size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={this._contractUs} activeOpacity={0.8}>*/}
                    {/*<View style={[styles.section, styles.noBorder]}>*/}
                    {/*<Image source={require('../../assets/contact.png')} style={styles.labelImg}/>*/}
                    {/*<Text style={{fontSize:16}}>联系我们</Text>*/}
                    {/*<View style={{marginLeft:'auto'}}>*/}
                    {/*<Ionicons name='ios-arrow-forward' size={20}/>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}

                    <TouchableOpacity onPress={f => f} activeOpacity={0.8}>
                        <View style={[styles.section]}>
                            <Image source={require('../../assets/version.png')} style={styles.labelImg}/>
                            <Text style={{fontSize: 16}}>版本信息</Text>
                            <Text style={{fontSize: 16, marginLeft: 'auto'}}>{DeviceInfo.getVersion()}</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                {/*<View style={styles.sectionContainer}>*/}
                {/**/}

                {/*<TouchableOpacity onPress={this._contractUs} activeOpacity={0.8}>*/}
                {/*<View style={[styles.section, styles.noBorder]}>*/}
                {/*<Image source={require('../../assets/feedback.png')} style={styles.labelImg}/>*/}
                {/*<Text style={{fontSize:16}}>意见反馈</Text>*/}
                {/*<View style={{marginLeft:'auto'}}>*/}
                {/*<Ionicons name='ios-arrow-forward' size={20}/>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    avater: {
        width: 74,
        height: 74,
        borderRadius: 37,
        resizeMode: 'stretch',
    },
    sectionContainer: {
        marginTop: 20,
        paddingHorizontal: 15,

        borderColor: '#C9C9C9',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    section: {
        paddingHorizontal: 2,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Split_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    labelImg: {
        width: 18,
        height: 18,
        resizeMode: 'stretch',
        marginRight: 8,
    },
    noBorder: {
        borderBottomWidth: 0,
    }
})