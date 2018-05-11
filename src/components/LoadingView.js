import React from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';

const LoadingView = (props) => (
    <View style={styles.loading}>
        <ActivityIndicator size={props.size || "large"} color="#3e9ce9"/>
        { props.noText ? null : <Text style={styles.loadingText}>数据加载中...</Text> }
    </View>
);

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center'
    }
});

export default LoadingView;
