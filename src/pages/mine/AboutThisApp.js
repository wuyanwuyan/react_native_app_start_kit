import React from "react";
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import {Base_color, Black_color, Dark_color} from "../../config/constants";
import DeviceInfo from 'react-native-device-info';

export default class AboutThisApp extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '关于币盈',
            headerBackTitle: null,
            headerBackTitleStyle: {
                color: 'white'
            },
            headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Image source={require('../../assets/logo.png')} style={[styles.logoImg]}/>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: Black_color, marginTop: 12}}>币盈</Text>
                <Text style={{fontSize: 14, color: Dark_color, marginTop: 12}}>{`版本号 V${DeviceInfo.getVersion()}`}</Text>
                <Text style={{fontSize: 10, marginTop: 10}}>Copyright @ xxs. All Rights Reserved</Text>
                <Text style={{fontSize: 14, marginTop: 30}}>
                    币盈，区块链行业媒体。致力于为区块链创业者以及数字货币投资者提供专业的产品和服务。
                </Text>
                <Text style={{fontSize: 14, marginTop: 14}}>
                    链圈 、 币圈新闻资讯深度解读为用户提供行业动态，帮助用户快速了解行业变化，为投资决策提供参考。
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal:30,
    },
    logoImg: {
        marginTop: 20,
        width: 80,
        height: 80,
        resizeMode: 'stretch',
    }

});
