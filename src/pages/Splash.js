import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';

export default class Splash extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            countDown: 10
        }
        this.key = null;
    }


    componentDidMount() {
        this.key = setInterval(() => {
            if (this.state.countDown <= 0) {
                clearInterval(this.key);
                this.key = null;
                this.navigate2Main();
            } else {
                let countDown = this.state.countDown - 1;
                this.setState({countDown})
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.key && clearInterval(this.key);
    }

    navigate2Main = () => {
        NavigationUtil.reset(this.props.navigation, 'Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.jpg')} style={styles.img}/>
                <TouchableOpacity style={styles.pass} onPress={this.navigate2Main}>
                    <Text style={null}>{`跳过(${this.state.countDown}s)`}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
      flex:1
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
        resizeMode: 'stretch',
    },
    pass: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 4,
        padding: 6
    },
    descTextContainer:{
        justifyContent:'flex-end',
        alignItems:'center'
    },
    descText:{
        paddingBottom:30,
        fontSize:12,
        color:'white',
    }

});
