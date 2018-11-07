import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CartScreen extends React.Component {
  static navigationOptions = {title: 'Cart'}

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Cart page!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
