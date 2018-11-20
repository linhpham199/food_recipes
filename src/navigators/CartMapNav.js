import React, { Component } from 'react';
import CartScreen from '../screens/CartScreen/CartScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import { createStackNavigator } from 'react-navigation';
import { theme } from '../constants/colors';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';

const CartNav = createStackNavigator({
  Cart: {screen: CartScreen},
  Map: {screen: MapScreen},
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

class CartMapNav extends Component {
  render() {
    return (
      <CartNav />
    );
  }
}

export default CartMapNav;