import React from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import LoadingView from '../../components/LoadingView';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';
import {Base_color, Dark_color} from '../../config/constants';
import {fetchGet, fetchPost, serialize} from "../../utils/fetchUtil";
import {codeTimestamp} from "../../utils/mytoken";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import {addNavigationHelpers, DrawerNavigator, NavigationActions, StackNavigator, TabNavigator} from "react-navigation";
import ExchangeDetailInfo from './ExchangeDetailInfo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {unitConvert, trendFormat} from "../../utils/formatUtil";
import ScrollContent2 from './ScrollContent2';

let param = {
    // market_id: 1303,
    category: 'market',
    v: '1.4.0',
    platform: 'm',
    language: 'zh_CN'
}

class ExchangeDetail extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        let params = (navigation.state && navigation.state.params) || {name: ''};
        return {
            headerTitle: params.name,
            title: '市场',
            tabBarIcon: ({tintColor}) => (
                <Icon name="chart-areaspline" size={25} color={tintColor}/>
            ),
            headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            categorylist: null,
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = () => {
        let {market_id} = this.props.navigation.state.params;
        let timestamp = Date.now();
        let code = codeTimestamp(timestamp);
        let finalParam = Object.assign({}, param, {market_id, timestamp, code});

        fetchGet(`https://api2.mytoken.org/exchange/categorylist`, finalParam).then((data) => {
            if (data.code !== 0) return;
            this.setState({categorylist: data.data.list, refreshing: false})
        })
    }

    render() {
        const state = this.state;
        if (!state.categorylist) return <LoadingView/>;
        let {market_id} = this.props.navigation.state.params;

        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarBackgroundColor="white"
                tabBarUnderlineStyle={{backgroundColor: Base_color}}
                tabBarActiveTextColor={Base_color}
                tabBarInactiveTextColor={Dark_color}
            >
                {
                    state.categorylist.map((v, i) =>
                        <ScrollContent2
                            {...v}
                            navigation={this.props.navigation}
                            market_id={market_id}
                            tabLabel={v.title}
                            key={v.title}>
                        </ScrollContent2>
                    )
                }
            </ScrollableTabView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        borderColor: Dark_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
        marginHorizontal: 10,
    }
})

export default TabNavigator({
    index222: {
        screen: ExchangeDetail
    },
    index1111: {
        screen: ExchangeDetailInfo
    },
}, {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#3e9ce9',
        inactiveTintColor: '#999999',
        showIcon: true,
        style: {
            backgroundColor: '#fff',
            ...Platform.select({
                ios: {height: 46},
                android: {}
            })
        },
        labelStyle: Platform.OS === 'ios' ? {paddingBottom: 2} : {
            marginTop: 0,
            marginBottom: 2,
            fontSize: 10,
        },
        tabStyle: {
            padding: 0
        }
    },
})