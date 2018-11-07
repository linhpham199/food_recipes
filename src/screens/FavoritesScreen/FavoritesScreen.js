import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class FavoritesScreen extends React.Component {
  static navigationOptions = {title: 'Favorites'}

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Favorites page!</Text>
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
