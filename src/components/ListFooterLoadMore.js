import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class ListFooterComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color="#3e9ce9"/>
                <Text style={styles.footerText}>数据加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 10
    }
})