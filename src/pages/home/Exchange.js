import React from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LoadingView from '../../components/LoadingView';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';
import {Dark_color} from '../../config/constants';
import {fetchGet, fetchPost, serialize} from "../../utils/fetchUtil";
import {codeTimestamp} from "../../utils/mytoken";

let param = {
    timestamp: 1525245920232,
    code: '55f3869577c0faf9c794280c06296b14',
    v: '1.4.0',
    platform: 'm',
    language: 'zh_CN'
}

export default class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = () => {
        let timestamp = Date.now();
        let code = codeTimestamp(timestamp);
        let finalParam = Object.assign({}, param, {timestamp, code});

        console.log('finalParam ', finalParam);
        fetchGet(`https://api2.mytoken.org/exchange/exchangelist`, finalParam).then((data) => {
            if (data.code !== 0) return;
            this.setState({listData: data.data.list, refreshing: false})
        })
    }

    _nav2Detail = (item) => () => {
        this.props.navigation.navigate('ExchangeDetail',item);
    }

    _renderItem = ({item, index}) => {
        return <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8} onPress={this._nav2Detail(item)}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 6}}>
                <Image source={{uri: item.logo}}
                       style={{borderRadius: 15, width: 30, height: 30, resizeMode: 'stretch', marginRight: 8}}/>
                <Text>{item.name}</Text>
            </View>
        </TouchableOpacity>
    }

    render() {
        const state = this.state;
        if (!state.listData) return <LoadingView/>;

        return (
            <FlatList
                style={{flex: 1, width: '100%'}}
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