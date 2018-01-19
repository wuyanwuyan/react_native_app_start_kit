import React from 'react'
import { StyleSheet, Text, View, Image ,ScrollView} from 'react-native'
import {SafeAreaView} from 'react-navigation'

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <Text>Drawer</Text>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
});

