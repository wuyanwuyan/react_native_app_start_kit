import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Home extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '首页',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={() => {
                navigation.navigate('DrawerOpen')
            }}></Icon.Button>)
        }
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>home</Text>
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
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);