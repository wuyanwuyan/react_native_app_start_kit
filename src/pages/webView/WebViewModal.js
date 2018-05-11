import React from 'react';
import {
    StyleSheet,
    WebView,
    BackHandler,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    Clipboard,
    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import ToastUtil from '../../utils/ToastUtil';


export default class WebViewModal extends React.Component {
    constructor(props) {
        super(props);

    }

    share = () => {
        Share.share({
            message: this.props.url,
            url: this.props.url,
            title: '币安网'
        }).catch((error) => {
            console.log(error)
        });
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.props.url);
        ToastUtil.showShort('已复制到剪切板');
    };

    render() {
        return (
            <Modal {...this.props} style={styles.bottomModal}>
                <View style={styles.modalContent}>
                    <View style={styles.itemsContainer}>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={styles.iconContainer}
                                              onPress={this.share}>
                                <Icon name="share" size={30} color="green"/>
                            </TouchableOpacity>
                            <Text style={styles.iconText}>分享</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={styles.iconContainer}
                                              onPress={this.writeToClipboard}>
                                <Icon name="content-copy" size={30} color="#000000"/>
                            </TouchableOpacity>
                            <Text style={styles.iconText}>复制链接</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#e8e8e8',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    itemsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    itemContainer: {
        width: 60,
        marginRight: 20,
    },
    iconContainer: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        marginTop: 8,
        fontSize: 12,
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center'
    }
})