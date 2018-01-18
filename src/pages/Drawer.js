import React from 'react';
import {View,Text} from 'react-native';

export default class Drawer extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Text>hello</Text>
        ),
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View>

            </View>
        )
    }
}