import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, View, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import cStyles from '../../styles/common';
import ArticleList from './ArticleList';
import {firstLoad, loadMoreArticle} from '../../actions/articles';
import LoadingView from '../../components/LoadingView';
import CodePush from 'react-native-code-push';
import ToastUtil from '../../utils/ToastUtil';
import Modal from 'react-native-modal';
import ProgressBar from '../../components/ProgressBar';

class Home extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '首页',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={() => {
                navigation.navigate('DrawerOpen')
            }}></Icon.Button>)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            showDownloading: false,
            showInstalling: false,
            downloadProgress: 0
        }
    }

    componentDidMount() {
        !__DEV__ && this.codePushUpdate();
        this.props.firstLoad();
    }

    codePushUpdate = () => {
        const deploymentKey = "vn1L8Hn4AIVLmbImJOxyUafkKFAaf09d6585-c32c-4359-8b28-0c1d7984bedb";
        // CodePush.checkForUpdate()
        CodePush.sync({
            deploymentKey,
            installMode: CodePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode:CodePush.InstallMode.IMMEDIATE,
            updateDialog: {
                title: '更新提示',
                optionalIgnoreButtonLabel: '稍后',
                optionalInstallButtonLabel: '立即更新',
                optionalUpdateMessage: 'App有新版本了，是否更新？',
                mandatoryContinueButtonLabel: '确定',
                mandatoryUpdateMessage: 'App有新版本了，立即更新。',
            },
        }, (status) => {
            switch (status) {
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:  // 下载中
                    this.setState({modalOpen: true, showDownloading: true, showInstalling: false});
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE: // 安装中
                    this.setState({showDownloading: false, showInstalling: true});
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED: //安装成功
                    this.setState({modalOpen: false, showDownloading: false, showInstalling: false});
                    break;
                case CodePush.SyncStatus.UNKNOWN_ERROR:
                    ToastUtil.showShort('未知的错误');
                    this.setState({modalOpen: false});
                    break;
                default:
                    break;
            }
        }, ({receivedBytes, totalBytes}) => {
            this.setState({downloadProgress: receivedBytes / totalBytes * 100});
        });
    };

    render() {
        const {articles: {cateList, articleList}} = this.props;
        const {modalOpen, showDownloading, showInstalling, downloadProgress} = this.state;
        return (
            <View style={cStyles.flex1}>
                <Modal isVisible={modalOpen} animationInTiming={100}>
                    <View style={styles.modalContent}>
                        <Text style={{textAlign: 'center'}}>{showInstalling ? '安装中' : '下载中'}</Text>
                        {showInstalling ? null : <ProgressBar width="100%" progress={downloadProgress} color="blue"/>}
                    </View>
                </Modal>

                {
                    cateList.length === 0 ? <LoadingView/> :
                        <ScrollableTabView
                            renderTabBar={()=><ScrollableTabBar/>}
                            tabBarBackgroundColor="#fcfcfc"
                            tabBarActiveTextColor="#3e9ce9"
                            tabBarInactiveTextColor="#aaaaaa">
                            {
                                cateList.map(v =>
                                    <ArticleList
                                        navigation={this.props.navigation}
                                        tabLabel={v.type}
                                        key={v.id}
                                        categoryId={v.id}
                                        articles={articleList[v.id]}
                                        loadMoreArticle={this.props.loadMoreArticle}
                                    />
                                )
                            }
                        </ScrollableTabView>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});

const mapStateToProps = (state) => {
    const {articles} = state;
    return {
        articles
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        firstLoad: bindActionCreators(firstLoad, dispatch),
        loadMoreArticle: bindActionCreators(loadMoreArticle, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);