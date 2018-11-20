import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { theme } from '../../constants/colors';
import * as storage from '../../constants/storage';
import { NavigationEvents } from 'react-navigation';
import{ Ionicons }  from'@expo/vector-icons';
import { retrieveStorage } from '../../utils/asyncStorage'

export default class FavoritesScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: 
      <TouchableOpacity onPress={() => navigation.state.params.updateFav()}>
        <Ionicons name='ios-refresh' 
          size={40} 
          color={theme.white} 
          style={{marginHorizontal: 20, bottom: -5}}/>
      </TouchableOpacity>
  })

  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }

  async componentDidMount() {
    this.setState({
      favorites: await retrieveStorage(storage.FAVORITES_STORAGE)
    })
    this.props.navigation.setParams({updateFav: this.update})
  }

  update = async() => {
    const favStorage = await retrieveStorage(storage.FAVORITES_STORAGE)    

      if (favStorage !== this.state.favorites) {
        this.setState({favorites: favStorage})        
      }   
  }

  render() {
    console.log(this.state.favorites)
    return (
      this.state.favorites !== null && this.state.favorites.length > 0
      ? <ScrollView styles={{flex: 1}}>
          <NavigationEvents 
            onWillFocus={() => this.update()}
          />
          <List>
              {this.state.favorites.map((recipe) => {
                return (
                  <ListItem
                    key={recipe.label}
                    title={recipe.label}
                    avatar={{uri:recipe.img}}
                    subtitle={recipe.source}
                    rightIcon={{name: 'arrow-forward', color: theme.blue}}
                    onPress={() => this.props.navigation.navigate('Details', {recipe: recipe})}
                  />)
              })
              }
            </List>
        </ScrollView>
      : <View style={styles.textContainer}>
          <Text style={styles.secondaryText}>There is no favorite recipes!</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  secondaryText: {
    fontSize: 25,
    fontFamily: 'Baskerville-SemiBoldItalic',
    textAlign: 'center',
    color: '#9E9E9E',
    paddingBottom: 10
  },
});
