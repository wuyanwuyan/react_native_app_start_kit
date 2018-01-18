import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commomStyles from '../../styles/common';


export default class Mine extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '我的',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={()=>{navigation.navigate('DrawerOpen')}}></Icon.Button>)
        }
    }
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View>
                <Text style={commomStyles.fontSizeNormal}>我的</Text>
            </View>
        )
    }
}