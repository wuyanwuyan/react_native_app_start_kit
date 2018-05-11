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
import ToastUtil from '../../utils/ToastUtil';

export default class WebViewFullScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header:null,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
        };
        this.canGoBack = false;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    handleShare = () => {
    }

    backHandler = () => {
       if (this.canGoBack) {
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
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
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
                    // injectedJavaScript={injectedJavaScript}
                    onMessage={this.onMessage}
                />
        );
    }
}
