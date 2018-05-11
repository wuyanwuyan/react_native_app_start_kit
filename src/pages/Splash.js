import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity,ImageBackground,Platform} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';
import {fetchGet} from "../utils/fetchUtil";
import WebViewFullScreen from "./webView/WebViewFullScreen";
import DeviceInfo from "react-native-device-info";


export default class Splash extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            countDown: 2,
            fetched:false,
        }
        this.key = null;
    }

    componentDidMount() {
        fetchGet('/api/ly/currency/switch',{os:Platform.OS,version:DeviceInfo.getVersion()}).then(data=>{
            this.setState({fetched:true});
            if(data.code !== 200) return;
            // 切换

            if(data.data.is_show){
                NavigationUtil.reset(this.props.navigation,'WebViewFullScreen',{url:data.data.ad_url});
            }

            this.key = setInterval(() => {
                if (this.state.countDown <= 0) {
                    clearInterval(this.key);
                    this.key = null;
                    this.navigate2Main();
                } else {
                    let countDown = this.state.countDown - 1;
                    this.setState({countDown})
                }
            }, 1000);

        }).catch(()=>{
            this.setState({fetched:true});
        })
    }

    componentWillUnmount() {
        this.key && clearInterval(this.key);
    }

    navigate2Main = () => {
        if(!this.state.fetched) return;
        NavigationUtil.reset(this.props.navigation, 'Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image style={{width:100,height:100,resizeMode:'stretch'}} source={require('../assets/logo.png')}/>
                </View>
                <TouchableOpacity style={styles.pass} onPress={this.navigate2Main}>
                    <Text style={{fontSize:16}}>{`跳过(${this.state.countDown}s)`}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    img: {
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    pass: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: '#b2b2b2',
        borderRadius: 4,
        padding: 8
    },
    descTextContainer:{
        justifyContent:'flex-end',
        alignItems:'center'
    },
    descText:{
        paddingBottom:30,
        fontSize:12,
        color:'white',
    }

});
