import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class ListFooterNoMore extends React.Component {
    static defaultProps = {
        style: null
    }

    constructor(props) {
        super(props);

    }

    render() {
        const props = this.props;
        return (
            <View style={[styles.footerContainer, props.style]}>
                <Text style={styles.footerText}>没有更多的数据...</Text>
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