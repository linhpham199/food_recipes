import React, { Component } from 'react';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import {createStackNavigator } from 'react-navigation';
import { theme } from '../constants/colors';
import { AsyncStorage } from 'react-native';

const FavNav = createStackNavigator({
  Favorites: {screen: FavoritesScreen},
  Details: {screen: DetailsScreen}
}, {
  navigationOptions: {
    // header: null,
    headerTitle: 'Food Recipes',
    headerTitleStyle: {
      color: theme.white,
      fontSize: 23,
    },
    headerBackTitle: null,
    headerTintColor: theme.white,
    headerStyle: {
      backgroundColor: theme.blue,
    },
  },
})

class FavoritesNav extends Component {
  render() {
    return (
    <FavNav />
    );
  }
}

export default FavoritesNav;