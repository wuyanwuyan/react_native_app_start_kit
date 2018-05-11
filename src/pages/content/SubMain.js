import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {fetchGet} from "../../utils/fetchUtil";
import {codeTimestamp} from "../../utils/mytoken";
import LoadingView from '../../components/LoadingView';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';
import {Base_color, Dark_color, Split_color} from '../../config/constants';
import moment from 'moment';

let param = {
    timestamp: 1525245920232,
    code: '55f3869577c0faf9c794280c06296b14',
    v: '1.4.0',
    platform: 'm',
    language: 'zh_CN'
};

export default class SubMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: null,
            refreshing: false,
            page:1,
            can_list_continue:true,
        };

        this.renderFunArr = [this._renderItem, this._renderItem1, this._renderItem2, this._renderItem3];
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = (page = 1) => {
        const props = this.props;

        let timestamp = Date.now();
        let code = codeTimestamp(timestamp);
        let finalParam = Object.assign({}, param, {
            type: props.type,
            keyword: props.keyword,
            tag: props.tag,
            page
        }, {timestamp, code, page});

        fetchGet(`https://api2.mytoken.org/media/medialist`, finalParam).then((data) => {
            if (data.code !== 0) return;

            if(data.data.list && data.data.list.length === 0){
                this.setState({can_list_continue:false});
            }

            if(page ===1){
                this.setState({listData: data.data.list, refreshing: false,page});
            }else{
                this.setState({listData: this.state.listData.concat(data.data.list), refreshing: false,page});
            }

        })
    }


    _nav2WebView = (url, title) => () => {
        this.props.navigation.navigate('WebViewPage', {url, title})
    }


    // 主页
    _renderItem = ({item, index}) => {
        return <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}
                                 onPress={this._nav2WebView(item.link, item.title)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: item.photo_abstract}}
                       style={{width: 80, height: 60, resizeMode: 'stretch', marginRight: 8}}/>
                <View style={{justifyContent: 'space-between', flex: 1, alignSelf: 'stretch'}}>
                    <Text numberOfLines={1} style={{width: '100%'}}>{item.title}</Text>
                    <Text numberOfLines={1}
                          style={{width: '100%', color: '#646464', fontSize: 13}}>{item.abstract}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: '#9e9e9e'
                    }}>{moment(item.posted_at * 1000).format('DD/MM/YYYY HH:mm')}</Text>
                </View>
            </View>

        </TouchableOpacity>
    }


    // 交易所快讯
    _renderItem1 = ({item, index}) => {
        return <View style={styles.itemContainer}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: item.social_avatar}} style={styles.socialAvatar}/>
                <View style={{flex: 1, paddingRight: 10}}>
                    <Text numberOfLines={1} style={{
                        width: '100%',
                        fontWeight: 'bold',
                        fontSize: 14
                    }}>{`${item.social_nickname} @${item.social_account}`}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: '#9e9e9e',
                    }}>{moment(item.posted_at * 1000).format('DD/MM/YYYY HH:mm')}</Text>
                    <View style={{
                        width: '100%',
                        marginTop: 6,
                        marginBottom: 8,
                        borderBottomColor: Split_color,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>
                        <Text style={styles.newsContent}>{item.content.replace(/<.+?>/g, '')}</Text>
                    </View>
                    <Text style={{
                        width: '100%',
                        color: '#646464',
                        fontSize: 13
                    }}>{item.content_translation.replace(/<.+?>/g, '')}</Text>

                    <Text style={{alignSelf: 'flex-end', fontSize: 12, color: '#7d7d7d'}}>已翻译</Text>
                </View>
            </View>
        </View>
    }


    _renderItem2 = ({item, index}) => {
        return <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}
                                 onPress={this._nav2WebView(item.link, item.title)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: item.photo_abstract}}
                       style={{width: 80, height: 60, resizeMode: 'stretch', marginRight: 8}}/>
                <View style={{justifyContent: 'space-between', flex: 1, alignSelf: 'stretch'}}>
                    <Text numberOfLines={1} style={{width: '100%'}}>{item.title}</Text>
                    <Text numberOfLines={1}
                          style={{width: '100%', color: '#646464', fontSize: 12}}>{item.abstract}</Text>
                    <View style={{flexDirection: 'row', paddingRight: 10}}>
                        <Text style={{
                            fontSize: 12,
                            color: '#9e9e9e',
                        }}>{item.source}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: '#9e9e9e',
                            marginLeft: 'auto',
                        }}>{moment(item.posted_at * 1000).format('DD/MM/YYYY HH:mm')}</Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    }

    _renderItem3 = ({item, index}) => {

        return <View style={styles.itemContainer}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: item.social_avatar}}
                       style={styles.socialAvatar}/>
                <View style={{flex: 1, paddingRight: 10}}>
                    <Text numberOfLines={1} style={{
                        width: '100%',
                        fontWeight: 'bold',
                        fontSize: 14
                    }}>{`${item.social_nickname} @${item.social_account}`}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: '#9e9e9e',
                    }}>{moment(item.posted_at * 1000).format('DD/MM/YYYY HH:mm')}</Text>
                    <View style={{
                        width: '100%',
                        marginTop: 6,
                        marginBottom: 8,
                        borderBottomColor: Split_color,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>
                        <Text style={styles.newsContent}>{item.content.replace(/<.+?>/g, '')}</Text>
                    </View>
                    <Text style={{
                        width: '100%',
                        color: '#646464',
                        fontSize: 13
                    }}>{item.content_translation.replace(/<.+?>/g, '')}</Text>

                    <Text style={{alignSelf: 'flex-end', fontSize: 10, color: '#7d7d7d', marginTop: 6}}>已翻译</Text>
                </View>
            </View>

        </View>
    }


    _refresh = () => {
        this.setState({refreshing:true});
        this._fetchData(1);
    }

    _loadMore = () => {
        if(!this.state.can_list_continue) return;
        this._fetchData(this.state.page + 1);
    }

    render() {
        const state = this.state;
        const props = this.props;
        if (!state.listData) return <LoadingView/>

        const renderItemFun = this.renderFunArr[this.props.index];

        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex: 1}}
                    data={state.listData}
                    extraData={this.state}
                    renderItem={renderItemFun}
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
        flex: 1
    },
    itemContainer: {
        paddingLeft: 10,
        paddingVertical: 5,
        borderBottomColor: Split_color,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    newsContent: {
        width: '100%',
        color: '#646464',
        fontSize: 13,
        paddingBottom: 8,
    },
    socialAvatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        marginRight: 8
    }

})