import React from "react";
import {Text, View, StyleSheet, Platform} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import {Base_color, Dark_color} from "../../config/constants";
import SubMain from './SubMain';
import LoadingView from '../../components/LoadingView';

const tabData = [
    {
        tabLabel: '主页',
        type: 1,
        keyword: '',
        tag: 'token_talk'
    },
    {
        tabLabel: '交易所快讯',
        type: 2,
        keyword: 'exchange',
        tag: 'exchanges,twitter'
    },
    {
        tabLabel: '教程',
        type: 1,
        keyword: '',
        tag: 'news'
    },
    {
        tabLabel: '大V推特',
        type: 2,
        keyword: 'KOL',
        tag: 'KOL'
    }
]

export default class Content extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '资讯',
            tabBarIcon: ({tintColor}) => (
                <Icon name="file-document-box" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={() => {
                navigation.navigate('DrawerOpen')
            }}></Icon.Button>),
            headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            tabData: null
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({tabData: tabData});
        }, 0)
    }

    render() {

        if (!this.state.tabData) return <LoadingView/>;

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    tabBarBackgroundColor="white"
                    tabBarUnderlineStyle={{backgroundColor: Base_color}}
                    tabBarActiveTextColor={Base_color}
                    tabBarInactiveTextColor={Dark_color}
                >
                    {
                        tabData.map((v, i) =>
                            <SubMain
                                index={i}
                                {...v}
                                key={v.tabLabel}
                                navigation={this.props.navigation}/>
                        )
                    }
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})