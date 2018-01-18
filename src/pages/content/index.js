import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Content extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '内容',
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
                <Text>测试版本1.00000</Text>
            </View>
        )
    }
}