import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class ListFooterComponent extends React.Component {
    static defaultProps = {
        style: null
    }
    constructor(props) {
        super(props);

    }

    render() {
        const props = this.props;
        return (
            <View style={[styles.container,props.style]}>
                <ActivityIndicator size="small" color="#3e9ce9"/>
                <Text style={styles.footerText}>数据加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:5,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 10
    }
})