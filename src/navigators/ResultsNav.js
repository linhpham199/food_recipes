import React, { Component } from 'react';
import {createStackNavigator } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import { theme } from '../constants/colors'

const ResultNav = createStackNavigator({
  Search: {screen: SearchScreen},
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

class ResultsNav extends Component {
  render() {
    return (
      <ResultNav />
    );
  }
}

export default ResultsNav;