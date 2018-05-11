import React from 'react';
import {Platform, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {fetchGet} from "../../utils/fetchUtil";
import ToastUtil from "../../utils/ToastUtil";
import {codeTimestamp} from "../../utils/mytoken";
import LoadingView from '../../components/LoadingView';


let param = {
    // market_id: 1303,
    category: 'market',
    v: '1.4.0',
    platform: 'm',
    language: 'zh_CN'
}

export default class ExchangeDetailInfo extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '交易所介绍',
            tabBarIcon: ({tintColor}) => (
                <Icon name="file-document" size={25} color={tintColor}/>
            ),
            headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };

    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = () => {
        let {market_id} = this.props.navigation.state.params;
        let timestamp = Date.now();
        let code = codeTimestamp(timestamp);
        let finalParam = Object.assign({}, param, {market_id, timestamp, code});

        fetchGet(`https://api2.mytoken.org/exchange/exchangeintro`, finalParam).then((data) => {
            if (data.code !== 0) {
                ToastUtil.showShort(data.message);
                return;
            }
            this.setState({data: data.data})
        })
    }

    render() {
        const {data} = this.state;
        if(!data) return  <LoadingView />;

        return (
            <View style={{paddingHorizontal:20,marginTop:20}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{borderRadius:40,width:80,height:80,resizeMode:'stretch',marginRight:8}} source={{uri:data.logo}}/>
                    <View>
                        <Text style={{fontSize:16}}>{data.name}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={f=>f}>
                            <Text style={{color:'blue',fontSize:14}}>{data.website}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{color:'black',marginTop:10}}>{`${data.description.replace(/<.+?>/g,'')}`}</Text>
            </View>
        )
    }
}