import React from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Platform} from 'react-native';
import LoadingView from '../../components/LoadingView';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';
import {Base_color, Dark_color, Split_color} from '../../config/constants';
import {fetchGet, fetchPost, serialize} from "../../utils/fetchUtil";
import {codeTimestamp} from "../../utils/mytoken";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import {addNavigationHelpers, DrawerNavigator, NavigationActions, StackNavigator, TabNavigator} from "react-navigation";
import ExchangeDetailInfo from './ExchangeDetailInfo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {unitConvert, trendFormat} from "../../utils/formatUtil";


let param = {
    // market_id: 1303,
    category: 'market',
    v: '1.4.0',
    platform: 'm',
    language: 'zh_CN'
}

export default class CoinDetail extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        let params = (navigation.state && navigation.state.params) || {name: ''};
        return {
            title: params.name + ',' + params.alias,
            headerBackTitle: null,
            headerBackTitleStyle: {
                color: 'white'
            },
            headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = () => {
        let {market_id, com_id, market_name, symbol, anchor} = this.props.navigation.state.params;
        let timestamp = Date.now();
        let code = codeTimestamp(timestamp);
        let finalParam = Object.assign({}, param, {
            market_id,
            com_id,
            market_name,
            symbol,
            anchor,
            timestamp,
            code
        });

        fetchGet(`https://api2.mytoken.org/currency/currencydetail`, finalParam).then((data) => {
            if (data.code !== 0) return;
            this.setState({data: data.data})
        })
    }

    render() {
        const state = this.state;
        if (!state.data) return <LoadingView/>;
        let item = state.data;
        let navigation = this.props.navigation;
        let params = (navigation.state && navigation.state.params) || {name: ''};


        let trendObj = trendFormat(parseFloat(item.percent_change_display));

        return (
            <ScrollView style={styles.container}>
                <View style={{paddingLeft: 10, paddingTop: 10}}>
                    <Text>{`${item.market_name}${params.alias},${item.name}(${item.symbol})`}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.coinTag}>基础链</Text>
                        <Text style={styles.coinTag}>货币</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginVertical: 16}}>
                        <Text style={{fontSize: 26}}>{item.price}</Text>
                        <Text>{`${item.anchor}≈${item.hr_price_display}`}</Text>
                    </View>
                    <Text
                        style={{color: trendObj.color, fontSize: 14, marginBottom: 12}}>{`${trendObj.txt}(今日)`}</Text>
                </View>

                <View>
                    <View style={{
                        backgroundColor: '#dfdfdf',
                        paddingLeft: 10,
                        paddingVertical: 6,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: '#a8a8a8'
                    }}>
                        <Text>综合信息</Text>
                    </View>

                    {
                        item.info_items.map((v, i) =>
                            <View style={styles.infoLine} key={v.key}>
                                <Text style={{color: 'gray'}}>{v.caption}</Text>
                                <Text style={{color: 'black', maxWidth: '50%'}} numberOfLines={1}>{v.content}</Text>
                            </View>
                        )
                    }

                </View>


                <View>
                    <View style={{
                        backgroundColor: '#dfdfdf',
                        paddingLeft: 10,
                        paddingVertical: 6,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: '#a8a8a8'
                    }}>
                        <Text>交易所</Text>
                    </View>
                    {
                        item.market_list.map((v, i) => {
                            return <View key={i} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingHorizontal: 8
                            }}>

                                {
                                    v.flag ? <Image style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            resizeMode: 'stretch',
                                            marginRight: 6
                                        }} source={{uri: v.flag}}/> :
                                        <View style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            backgroundColor:'#b3b3b3',
                                            marginRight: 6
                                        }}></View>
                                }

                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{fontSize: 12, color: '#555555'}}>{`${v.alias} ${v.name}`}</Text>
                                        <Text style={{fontSize: 12, color: '#b4b4b4'}}>{item.pair}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 4}}>
                                        <Text style={{fontSize: 12, color: 'blue'}}>{`${v.website}`}</Text>
                                        <Text style={{fontSize: 12}}>{`$${item.volume_24h_usd}`}</Text>
                                    </View>
                                </View>


                            </View>;
                        })
                    }
                </View>

            </ScrollView>
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
    },
    coinTag: {
        backgroundColor: '#a8a8a8',
        color: 'black',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginRight: 18,
        marginTop: 10,
    },
    infoLine: {
        paddingHorizontal: 10,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Split_color,
    }
});