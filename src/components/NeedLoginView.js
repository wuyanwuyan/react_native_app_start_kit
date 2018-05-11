import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Hightlight_color} from "../config/constants";

export default class NeedLoginView extends React.Component {
    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    _onPress = () => {
        this.props.navigation.navigate('LoginRegister');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/noConcern.png')} style={styles.img}/>
                <Text>登录后，可查看收藏项目</Text>
                <TouchableHighlight style={styles.addBtn} onPress={this._onPress} activeOpacity={1}
                                    underlayColor={Hightlight_color} delayPressIn={0}>
                    <Text>登录</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 170,
        height: 116,
        resizeMode: 'stretch',
        marginBottom: 18,
    },
    addBtn: {
        width: 110,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D8D8D8',
        marginTop: 42,
    }
})