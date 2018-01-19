import React from "react";
import {Text, View,StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Content extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '内容',
            tabBarIcon: ({tintColor}) => (
                <Icon name="file-document-box" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={() => {
                navigation.navigate('DrawerOpen')
            }}></Icon.Button>)
        }
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>内容</Text>
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