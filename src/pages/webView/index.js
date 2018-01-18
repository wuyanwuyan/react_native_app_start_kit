import React from 'react';
import {
    StyleSheet,
    WebView,
    BackHandler,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import WebViewModal from './WebViewModal';
import ToastUtil from '../../utils/ToastUtil';

// 单页面网页可能出现title改变
let injectedJavaScript = `
        window.postMessage(document.title,"*")
`;

export default class WebViewPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerBackTitle: null,
            headerBackTitleStyle: {
                color: '#3e9ce9'
            },
            headerRight: (
                <Icon.Button
                    name="dots-three-horizontal"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.state.params.handleShare();
                    }}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        };
        this.canGoBack = false;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
        this.props.navigation.setParams({handleShare: this.handleShare});
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    handleShare = () => {
        this.setState({modalOpen: true});
    }

    backHandler = () => {
        if (this.state.modalOpen) {
            this.setState({modalOpen: false});
            return true;
        } else if (this.canGoBack) {
            this.webview.goBack();
            return true;
        }
        return false;
    }

    onNavigationStateChange = (navState) => {
        console.log('onNavigationStateChange  ', navState);
        this.canGoBack = navState.canGoBack;
    };

    onMessage = (message, title) => {
        console.log('onMessage  ', title, message.nativeEvent)
        this.props.navigation.setParams({title: message.nativeEvent.data})
    }

    render() {
        const {params} = this.props.navigation.state;
        const {modalOpen} = this.state;
        return (
            <View style={{flex: 1}}>
                <WebViewModal
                    isVisible={modalOpen}
                    onBackdropPress={this.backHandler}
                    onBackButtonPress={this.backHandler}
                    url={params.url}
                />
                <WebView
                    style={{flex: 1}}
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    source={{uri: params.url}}
                    domStorageEnabled
                    scalesPageToFit
                    startInLoadingState
                    onShouldStartLoadWithRequest={() => true}
                    onNavigationStateChange={this.onNavigationStateChange}
                    injectedJavaScript={injectedJavaScript}
                    onMessage={this.onMessage}
                />
            </View>
        );
    }
}
