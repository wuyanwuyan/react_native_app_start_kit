import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ListEmptyComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View>
                <Text>
                    暂无数据
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})