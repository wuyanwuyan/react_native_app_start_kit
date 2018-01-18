import React from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';

export default class Separator extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.separator}>

            </View>
        )
    }
}

let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    separator:{
        height:StyleSheet.hairlineWidth,
        width:screenWidth,
        backgroundColor:'#b5b7ba',
    }
})