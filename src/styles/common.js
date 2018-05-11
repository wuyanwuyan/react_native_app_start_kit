import {StyleSheet,Dimensions} from 'react-native';


let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    flex1: {flex: 1},
    flexDirectionRow: {flexDirection: 'row'},
    fontSizeNormal: {fontSize: 12},
    separatorFull:{
        width:screenWidth,
        height:0,
        backgroundColor:'#b5b7ba',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:'rgba(0, 0, 0, 0.25)',
    },
    center:{
        alignItems:'center',
        justifyContent:'center',
    }
})


export default styles;