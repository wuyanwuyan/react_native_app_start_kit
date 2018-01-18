import React from 'react';
import {View, Text, FlatList, Platform, TouchableOpacity,TouchableNativeFeedback, Image, StyleSheet, Dimensions} from 'react-native';
import cStyles from '../../styles/common';

import Separator from '../../components/Separator';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';

// import Swiper from 'react-native-swiper';

let TouchableItemContainer = Platform.select({
    ios:TouchableOpacity,
    android:TouchableNativeFeedback
})

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: Infinity,
            swiperData: [],
            data: [],
            refreshing: false,
            hasMore: true,
        }
    }

    componentDidMount() {
        this.props.loadMoreArticle(this.props.categoryId,0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.articles && nextProps.articles.contents && nextProps.articles.contents.length >= nextProps.articles.total) {
            this.setState({hasMore: false});
        }
    }

    refresh = () => {
        // this.setState({refreshing: true});
        // getArticles(this.state.data.length).then(data => {
        //     this.setState({refreshing: false});
        // })
    }

    loadMore = (info) => {
        if (!this.state.hasMore) return;
        this.props.loadMoreArticle(this.props.categoryId,this.props.articles.contents.length);
    }

    _openWebView = (url, title = '') => () => {
        // this.props.navigation.navigate('WebViewPage', {url, title});
        this.props.navigation.navigate('CandleStickChartScreen', {url, title});
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableItemContainer onPress={this._openWebView(`http://www.cqaso.com/zhuanlan/a/${item.id}`)}>
                <View style={styles.articleContainer}>
                    <Image source={{uri: item.thumbnail}} style={styles.articleImg}/>
                    <View style={cStyles.flex1}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
                    </View>
                </View>
            </TouchableItemContainer>
        )
    }

    render() {
        const {articles} = this.props;
        const {hasMore, refreshing} = this.state;
        let isEmpty = !hasMore && articles && articles.contents.length === 0;
        let flatListData = (articles && articles.contents) || [];
        return (
            <View style={cStyles.flex1}>
                <FlatList
                    data={flatListData}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={Separator}
                    ListEmptyComponent={ isEmpty ? ListEmptyComponent : null}
                    refreshing={refreshing}
                    onRefresh={this.refresh}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.0001}  // 有坑，这个数值
                    ListFooterComponent={(hasMore) ? ListFooterLoadMore : ListFooterNoMore}
                />
            </View>
        )
    }
}

let sreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    swiperWrapper: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperTxt: {
        position: 'absolute',
        bottom: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    articleContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 6
    },
    articleImg: {
        width: 120,
        height: 75,
        marginRight: 10,
        resizeMode: 'cover'
    },
    title: {
        flex: 1,
        fontSize: 14,
        flexWrap: 'wrap'

    },
    desc: {
        flex: 1,
        fontSize: 12,
        color: '#9A9898'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }

})


{/*<View style={styles.swiperWrapper}>*/
}
{/*{ swiperData.length > 0 ?*/
}
{/*<Swiper autoplay={true} paginationStyle={{bottom: 6}} height="100%">*/
}
{/*{*/
}
{/*swiperData.map((v, i) => {*/
}
{/*return (*/
}
{/*<TouchableOpacity activeOpacity={0.9} style={cStyles.flex1} key={i}*/
}
{/*onPress={this._openWebView(`http://www.cqaso.com/zhuanlan/a/${v.articleId}`)}>*/
}
{/*<Image source={{uri: v.thumbnail} } style={cStyles.flex1}/>*/
}
{/*<Text style={styles.swiperTxt}>{v.title}</Text>*/
}
{/*</TouchableOpacity>*/
}
{/*)*/
}
{/*}*/
}
{/*)*/
}
{/*}*/
}
{/*</Swiper> : <LoadingView/>}*/
}
{/*</View>*/
}