import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Mine extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '我的',
            tabBarIcon: ({tintColor}) => (
                <Icon name="account" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={()=>{navigation.navigate('DrawerOpen')}}></Icon.Button>)
        }
    }
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>我的</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})