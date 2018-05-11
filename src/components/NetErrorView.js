import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Hightlight_color} from "../config/constants";

export default class NetErrorView extends React.Component {
    static defaultProps = {
        refresh: f => f,
    }

    constructor(props) {
        super(props);
    }

    _onPress = () => {
        this.props.refresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/noConcern.png')} style={styles.img}/>
                <Text>网络异常!</Text>
                <TouchableHighlight style={styles.addBtn} onPress={this._onPress} activeOpacity={1}
                                    underlayColor={Hightlight_color} delayPressIn={0}>
                    <Text>点击重试</Text>
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