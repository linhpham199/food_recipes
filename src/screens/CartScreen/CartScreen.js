import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
import * as storage from '../../constants/storage';
import { CheckBox } from 'react-native-elements';
import{ Ionicons }  from'@expo/vector-icons';
import { theme } from '../../constants/colors';
import RecipeListItem from '../../components/recipe/RecipeListItem';
import { retrieveStorage, updateStorage } from '../../utils/asyncStorage'

export default class CartScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: 
      <TouchableOpacity onPress={() => navigation.state.params.updateCart()}>
        <Ionicons name='ios-refresh' 
          size={40} 
          color={theme.white} 
          style={{marginHorizontal: 20, bottom: -5}}/>
      </TouchableOpacity>
  })

  constructor(props) {
    super(props)
    this.state = {
      cart: [],
    }
  }

  async componentDidMount() {
    this.setState({
      cart: await retrieveStorage(storage.CART_STORAGE)
    })

    this.props.navigation.setParams({updateCart: this.update})    

    console.log(this.state.cart)
  }

  update = async() => {
    const cartStorage = await retrieveStorage(storage.CART_STORAGE)  

      if (cartStorage !== this.state.cart) {
        this.setState({cart: cartStorage})        
      }   
  }

  checked = () => {
    console.log('checked')
  }

  delete = (label) => {
    this.setState({
      cart: this.state.cart.filter(rep => rep.label !== label)
    }, async() => await updateStorage(storage.CART_STORAGE, this.state.cart)
  )

    console.log(this.state.cart)

  }

  render() {
    return (
      this.state.cart !== null && this.state.cart.length > 0
      ? <ScrollView>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() =>  this.props.navigation.navigate('Map')}>
          <View style={styles.button}>
            <Text style={styles.btnText}>Find markets</Text>
          </View>
        </TouchableOpacity>
          {this.state.cart.map((rep, i) => {
            return <RecipeListItem recipe={rep} key={i} delete={(rep) => this.delete(rep)}/>
          })}
        </ScrollView>
      : <View style={styles.textContainer}>
          <Text style={styles.secondaryText}>There is nothing in cart!</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  button: {
    backgroundColor: theme.blue,
    height: 30,
    width: 150,
    marginTop: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  btnText: {
    color: theme.white, 
    fontSize: 17, 
    fontFamily: 'Baskerville-SemiBoldItalic'
  }
});
