import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {fetchGet, fetchPost, serialize} from "../../utils/fetchUtil";
import LoadingView from '../../components/LoadingView';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';
import {Dark_color} from '../../config/constants';
import {codeTimestamp} from "../../utils/mytoken";
import {unitConvert, trendFormat} from "../../utils/formatUtil";

let param = {
    // market_id: 1303,
    size: 20,
    direction: 'asc',
    sort: 'rank',
    timestamp: 1525245920232,
    code: '55f3869577c0faf9c794280c06296b14',
    v: '1.4.0',
    platform: 'm',
    language: 'zh_CN'
}

export default class ScrollContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: null,
            refreshing: false,
            page: 1,
            can_list_continue: true,
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = (page = 1) => {
        let timestamp = Date.now();
        let code = codeTimestamp(timestamp);
        let finalParam = Object.assign({}, param, {market_id: this.props.market_id, timestamp, code, page})
        fetchPost(`https://api2.mytoken.org/currency/currencylist?${serialize(finalParam)}`).then((data) => {
            if (data.code !== 0) return;

            this.setState({page});

            if (data.data.list.length === 0) {
                this.setState({can_list_continue: false});
            }

            if (page === 1) {
                this.setState({listData: data.data.list, refreshing: false})
            } else {
                this.setState({listData: [...new Set(this.state.listData.concat(data.data.list))], refreshing: false})
            }
        })
    }

    _loadMore = () => {
        if (!this.state.can_list_continue) return;
        this._fetchData(this.state.page + 1);
    }

    _refresh = () => {
        this.setState({refreshing: true});
        this._fetchData(1);
    }

    _renderItem = ({item, index}) => {
        let trendObj = trendFormat(item.percent_change_display);
        return <View style={styles.itemContainer}>
            <Text style={{
                color: Dark_color,
                fontSize: 12
            }}>{`市值#${index + 1} $ ${unitConvert(item.market_cap_usd)},${item.alias}`}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 6}}>
                <Image source={{uri: item.logo}}
                       style={{width: 20, height: 20, resizeMode: 'stretch', marginRight: 2}}/>
                <Text>{`${item.pair}`}</Text>
                <Text style={{marginLeft: 'auto', fontSize: 16, marginRight: 6}}>{item.hr_price_display}</Text>
                <View style={{
                    borderRadius: 4,
                    backgroundColor: trendObj.color,
                    paddingHorizontal: 8,
                    paddingVertical: 4
                }}>
                    <Text style={{color: 'white'}}>{trendObj.txt}</Text>
                </View>
            </View>
            <Text style={{color: Dark_color, fontSize: 12}}>{`交易额 $ ${unitConvert(item.volume_24h_usd)}`}</Text>
        </View>
    }

    render() {
        const state = this.state;
        if (!state.listData) return <LoadingView/>;

        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex: 1}}
                    data={state.listData}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(value, index) => value.id}
                    refreshing={state.refreshing}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={0.0001}  // 有坑，这个数值
                    ListFooterComponent={state.can_list_continue ? <ListFooterLoadMore/> : <ListFooterNoMore/>}
                />
            </View>
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
        paddingVertical: 10,
        width: 'auto',
        marginHorizontal: 10,
    }
})