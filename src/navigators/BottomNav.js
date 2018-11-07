import React, { Component } from 'react';
import{ createBottomTabNavigator } from'react-navigation';
import{ Ionicons }  from'@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import CartScreen from '../screens/CartScreen/CartScreen';
import ResultNav from './ResultsNav';
import { theme } from '../constants/colors'

const AppNav = createBottomTabNavigator({
  Search: {screen: ResultNav},
  Favorites: {screen: FavoritesScreen},
  Cart: {screen: CartScreen}
}, 
{
  // tabBarOptions: {
  //   activeTintColor: theme.black,
  //   activeBackgroundColor: theme.yellow,
  //   inactiveBackgroundColor: theme.yellow,
  // },
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