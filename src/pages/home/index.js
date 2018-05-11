import React from "react";
import {StyleSheet, Text, View, Platform, TouchableOpacity, InteractionManager} from "react-native";
import {Base_color, Dark_color} from "../../config/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import tabData from '../../config/tabData';
import ScrollContent from './ScrollContent';
import Exchange from './Exchange';
import LoadingView from '../../components/LoadingView';
import Profile from '../../utils/profile';

class Home extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        let params = (navigation.state && navigation.state.params) || {changeTab: f => f, tabIndex: 0};
        const {changeTab, tabIndex} = params;
        return {
            headerTitle: <HeaderTabs changeTab={changeTab} tabIndex={tabIndex}/>,
            title: '行情',
            tabBarIcon: ({tintColor}) => (
                <Icon name="chart-areaspline" size={25} color={tintColor}/>
            ),
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            tabData: null
        }
    }

    componentDidMount() {
        Profile.getAsync();
        this.props.navigation.setParams({changeTab: this._changeTab, tabIndex: this.state.tabIndex});
        setTimeout(() => {
            this.setState({tabData: tabData});
        }, 0)
    }

    _changeTab = (tabIndex) => {
        this.setState({tabIndex});
        this.props.navigation.setParams({tabIndex})
    }

    render() {
        let navigation = this.props.navigation;

        if (!this.state.tabData) return <LoadingView/>;

        return (
            <View style={styles.container}>
                {
                    this.state.tabIndex === 0 ?
                        <ScrollableTabView
                            ref={r => this.tabView = r}
                            renderTabBar={() => <ScrollableTabBar/>}
                            tabBarUnderlineStyle={{backgroundColor: Base_color}}
                            tabBarActiveTextColor={Base_color}
                            tabBarInactiveTextColor={Dark_color}
                        >
                            {
                                this.state.tabData.map((v, i) =>
                                    <ScrollContent
                                        {...v}
                                        navigation={navigation}
                                        tabLabel={v.name}
                                        key={v.name}/>
                                )
                            }
                        </ScrollableTabView>
                        : <Exchange
                            navigation={this.props.navigation}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'blue',
    },
    tab: {},
    tabActive: {
        backgroundColor: 'blue'
    }
})

class HeaderTabs extends React.Component {
    _changeTab = (tabIndex) => () => {
        this.props.changeTab(tabIndex);
    }

    render() {
        const state = this.state;
        const {tabIndex} = this.props;
        return (
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={this._changeTab(0)}
                                      style={tabIndex === 0 ? [styles.tab, styles.tabActive] : styles.tab}>
                        <Text style={{
                            paddingVertical: 6,
                            paddingHorizontal: 10,
                            fontSize: 12,
                            color: tabIndex === 0 ? 'white' : 'blue'
                        }}>币行情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._changeTab(1)}
                                      style={tabIndex === 1 ? [styles.tab, styles.tabActive] : styles.tab}>
                        <Text style={{
                            paddingVertical: 6,
                            paddingHorizontal: 14,
                            fontSize: 12,
                            color: tabIndex === 1 ? 'white' : 'blue'
                        }}>交易所</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default Home;
