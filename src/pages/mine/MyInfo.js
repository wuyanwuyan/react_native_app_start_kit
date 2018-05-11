import React from "react";
import {Platform, StyleSheet, Text, TouchableHighlight, Image, View,ScrollView} from "react-native";
import {Base_color, Dark_color, Hightlight_color, Split_color} from "../../config/constants";
import Profile from "../../utils/profile";

export default class MyInfo extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '个人信息',
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

    _logout = () => {
        Profile.logout();
        this.props.navigation.goBack();
    }

    render() {
        let profile = Profile.get();
        let hasPhone = profile && profile.phone;
        return (
            <ScrollView style={[styles.container]} contentContainerStyle={{alignItems:'center'}}>
                <Image source={require('../../assets/logo.png')} style={styles.logoImg}/>
                    {
                        hasPhone ? <Text style={{fontSize:16}}>{profile.phone}</Text> : null
                    }

                    <TouchableHighlight style={styles.logoutBtn} onPress={this._logout} activeOpacity={1} underlayColor={Hightlight_color}>
                        <Text style={{color:'#fe6478',fontSize:14}}>退出登录</Text>
                    </TouchableHighlight>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    logoutBtn:{
        width:290,
        height:48,
        borderColor:'#fe6478',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        marginTop:110,

    },
    logoImg: {
        width: 75,
        height: 75,
        resizeMode: 'stretch',
        marginTop:45,
        marginBottom:22
    }

});
