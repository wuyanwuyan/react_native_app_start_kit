import React, {Component} from "react";
import {BackHandler, Platform} from "react-native";
import {connect} from "react-redux";
import {addNavigationHelpers, DrawerNavigator, NavigationActions, StackNavigator, TabNavigator} from "react-navigation";
import Splash from "./pages/Splash";
import Home from "./pages/home";
import Content from "./pages/content";
import Mine from "./pages/mine";
import LoginRegister from "./pages/LoginRegister";
import ExchangeDetail from "./pages/home/ExchangeDetail";
import CoinDetail from "./pages/home/CoinDetail";
import WebViewPage from "./pages/webView/index";
import AboutThisApp from "./pages/mine/AboutThisApp";
import MyInfo from "./pages/mine/MyInfo";
import ToastUtil from "./utils/ToastUtil";
import getSlideFromRightTransition from "./utils/react-navigation-slide-from-right-transition";
import WebViewFullScreen from "./pages/webView/WebViewFullScreen";

const Tab = TabNavigator(
    {
        index: {
            screen: Home
        },
        index2: {
            screen: Content
        },
        index3: {
            screen: Mine
        }
    },
    {
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
    });

//再包裹一层StackNavigator，是因为需要StackNavigator的header，https://reactnavigation.org/docs/intro/headers
// const DrawHome = StackNavigator(
//     {
//         DrawHome: {
//             screen: Tab
//         }
//     },
//     {
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#3e9ce9'
//             },
//             headerTitleStyle: {
//                 color: '#fff',
//                 fontSize: 20
//             },
//             headerTintColor: '#fff'
//         }
//     }
// );

// const DrawerNav = DrawerNavigator({
//     DrawerNav: {
//         screen: DrawHome
//     }
// }, {
//     drawerWidth: 300,
//     contentComponent: (props) => <DrawerContainer {...props} />
// })


const App = StackNavigator(
    {
        Splash: {screen: Splash},
        Home: {
            screen: Tab,
        },
        LoginRegister: {
            screen: LoginRegister
        },
        ExchangeDetail: {
            screen: ExchangeDetail
        },
        WebViewPage: {
            screen: WebViewPage
        },
        WebViewFullScreen: {
            screen: WebViewFullScreen

        },
        AboutThisApp: {
            screen: AboutThisApp
        },
        MyInfo: {
            screen: MyInfo
        },
        CoinDetail: {
            screen: CoinDetail
        }
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTitleStyle: {
                color: 'black',
                ...Platform.select({
                    ios: null,
                    android: {
                        textAlign: 'center',
                        alignSelf: 'center',
                    }
                }),
            },
            headerTintColor: 'black'
        },
        cardStyle: {
            backgroundColor: '#fff',
        },
        transitionConfig: Platform.OS === 'ios' ? null : getSlideFromRightTransition
    });

class AppWithRedux extends Component {
    constructor(props) {
        super(...arguments);
        this.lastBackPressed = null;
    }

    // https://github.com/react-community/react-navigation/issues/117
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastUtil.showShort('再按一次退出应用');
            return true;
        } else {
            dispatch(NavigationActions.back());
            return true;
        }
    };

    render() {
        const {dispatch, nav} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        })

        return <App navigation={navigation}/>
    }
}

const mapStateToProps = state => ({nav: state.nav});
export default connect(mapStateToProps)(AppWithRedux);
export {App};
