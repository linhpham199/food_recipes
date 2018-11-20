import React, { Component } from 'react';
import{ createBottomTabNavigator } from'react-navigation';
import{ Ionicons }  from'@expo/vector-icons';
import ResultNav from './ResultsNav';
import { theme } from '../constants/colors'
import FavoritesNav from './FavoritesNav';
import CartMapNav from './CartMapNav';
import { AsyncStorage } from 'react-native';

const AppNav = createBottomTabNavigator({
  Search: {screen: ResultNav},
  Favorites: {screen: FavoritesNav},
  Cart: {screen: CartMapNav}
}, 
{ lazy: false,
  navigationOptions: ({navigation}) => {
    return {tabBarIcon: ({tintColor}) => {
      const { routeName } = navigation.state 
      if (routeName === 'Search') {
        return <Ionicons name='ios-search' size={25} color={tintColor}/>
      } else if (routeName === 'Favorites') {
        return <Ionicons name='ios-heart' size={25} color={tintColor}/>
      } else if (routeName === 'Cart') {
        return <Ionicons name='ios-cart' size={25} color={tintColor}/>
      }
    }
  }}
})

class BottomNav extends Component {
  render() {
    return (
      <AppNav />
    );
  }
}

export default BottomNav;