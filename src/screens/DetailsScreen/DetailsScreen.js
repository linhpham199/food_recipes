import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { theme, imageCover } from '../../constants/colors';
import{ Ionicons }  from'@expo/vector-icons';
import * as storage from '../../constants/storage';
import { retrieveStorage, updateStorage } from '../../utils/asyncStorage'

class DetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: this.props.navigation.state.params.recipe,
      favorites: [],
      isFavorite: null,
      cart: [],
      isInCart: null,
    }
    this.checkInStorage = this.checkInStorage.bind(this)
  }

  async componentDidMount() {
    const favStorage = await this.retrieve(storage.FAVORITES_STORAGE)
    const cartStorage = await this.retrieve(storage.CART_STORAGE)

    console.log(cartStorage)
    console.log(favStorage)

    this.setState({
      favorites: favStorage,
      cart: cartStorage,
      isFavorite: favStorage.length > 0 && this.checkInStorage(favStorage),
      isInCart: cartStorage.length > 0 && this.checkInStorage(cartStorage)
    })
  }

  checkInStorage(storage) {
    return storage.filter(rep => rep.label === this.state.recipe.label).length > 0
  }

  retrieve = async(input) => {
    let storage = await retrieveStorage(input)
    // await AsyncStorage.removeItem(input)

    if (storage === null) {
      const items = []
      await updateStorage(input, items)
      storage = await retrieveStorage(input)
    }

    return storage
  }

  toggleFavorite = async() => {
    const { isFavorite, favorites } = this.state

    this.setState({
      isFavorite: !isFavorite,
      favorites: isFavorite
        ? favorites.filter(rep => rep.label !== this.state.recipe.label)
        : [...favorites, this.state.recipe]    
    }, async() => {
      await updateStorage(storage.FAVORITES_STORAGE, this.state.favorites)
    })
  }

  toggleCart = async() => {
    const { isInCart, cart } = this.state

    this.setState({
      isInCart: !isInCart,
      cart: isInCart
      ? this.state.cart.filter(rep => rep.label !== this.state.recipe.label)
      : [...cart, 
          { label: this.state.recipe.label, 
            ingredients: 
              this.state.recipe.ingredients.map(ing => ({
                ing,
                checked: false
              }))  
          }
        ] 
    }, async() => {
      await updateStorage(storage.CART_STORAGE, this.state.cart)
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.imgContainer}> 
          <Image 
            resizeMode='cover'
            style={styles.image}
            source={{uri: this.state.recipe.img}}
            />
          <View style={{backgroundColor: imageCover.black30, height: 220}}></View>
        </View>
        <View style={styles.textContainer}> 
          <Text style={styles.title}>{this.state.recipe.label}</Text>
          <Text style={styles.secondaryText}>By {this.state.recipe.source}</Text>
          <View style={styles.labelContainer}>
            <View style={styles.label}>
              <Ionicons name='ios-people' size={20} color={theme.black} />
              <Text style={styles.text}>  {this.state.recipe.yield} servings</Text>
            </View>
            <View style={styles.label}>
              <Ionicons name='ios-nutrition' size={20} color={theme.black} />
              <Text style={styles.text}>  {this.state.recipe.calories} kcal</Text>
            </View>
          </View>
          <View style={styles.smallBtnGroup}>
            <View style={styles.label}>
              <TouchableOpacity onPress={this.toggleCart}>
                <View style={styles.iconBtn}>
                  {!this.state.isInCart
                    ? <Ionicons 
                        style={{paddingVertical: 5, paddingHorizontal: 7}} 
                        name='ios-cart' 
                        size={21} 
                        color={theme.blue}/>
                    : <Ionicons 
                        style={{paddingVertical: 5, paddingHorizontal: 7, backgroundColor: theme.blue}} 
                        name='ios-cart' 
                        size={21} 
                        color={theme.white}/>
                  }
                </View>
              </TouchableOpacity>
              {!this.state.isInCart
                ? <Text style={{color: theme.black}}>Add to cart</Text>
                : <Text style={{color: theme.black}}>Remove from cart</Text>
              }
            </View>
            <View style={[styles.label, {marginTop: 10}]}>
              <TouchableOpacity onPress={this.toggleFavorite}>
                <View style={styles.iconBtn}>
                  {!this.state.isFavorite 
                    ? <Ionicons 
                        style={{padding: 5}} 
                        name='ios-heart' 
                        size={20} 
                        color={theme.blue}/>
                    : <Ionicons 
                        style={{padding: 5, backgroundColor: theme.blue}} 
                        name='ios-heart' 
                        size={20} 
                        color={theme.white}
                        />
                    }
                </View>
              </TouchableOpacity>
              {!this.state.isFavorite 
                ? <Text style={{color: theme.black}}>Add to favorites</Text>
                : <Text style={{color: theme.black}}>Remove from favorites</Text>}
            </View>
          </View>
          <View style={{marginTop: 20, width: '80%'}}> 
            {this.state.recipe.ingredients.map((ing, i) => 
              <View style={styles.ingredient} key={i}>
                <Ionicons name='ios-checkmark-circle-outline' size={20} color={theme.blue} />
                <Text style={[styles.text, {marginLeft: 7}]}>{ing}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => { Linking.openURL(this.state.recipe.url) }}>
            <Text style={styles.btnText}>See full directions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({
  image: {
    height: 220,
    flex: 1,
    width: '100%',
    position: 'absolute'
  },
  title: {
    fontSize: 25,
    fontFamily: 'Baskerville-SemiBoldItalic',
    width: '100%',
    color: theme.black,
    padding: 10,
    textAlign: 'center'
  },
  secondaryText: {
    fontSize: 18,
    fontFamily: 'Baskerville-SemiBoldItalic',
    textAlign: 'center',
    color: '#9E9E9E',
    paddingBottom: 10
  },
  text: {
    color: theme.black,
    fontSize: 15,
  },
  textContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 4,
    top: -50
  },
  imgContainer: {
    height: 220,
  },
  label: {
    marginHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  labelContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  ingredient: {
    marginVertical: 5, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  button: {
    backgroundColor: theme.blue,
    height: 30,
    width: 170,
    bottom: -15,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  btnText: {
    color: theme.white, 
    fontSize: 17, 
    fontFamily: 'Baskerville-SemiBoldItalic'
  },
  iconBtn: {
    borderWidth: 1, 
    borderColor: theme.blue, 
    borderRadius: 5,
    marginHorizontal: 10
  },
  smallBtnGroup: {
    marginTop: 10, 
    width: '70%',
    flexDirection: 'column', 
    alignItems: 'flex-start',
  }
})