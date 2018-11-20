import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/colors';
import{ Ionicons }  from'@expo/vector-icons';
import { retrieveStorage, updateStorage } from '../../utils/asyncStorage';

class RecipeListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: this.props.recipe.ingredients,
    }
    this.toggleIngredient = this.toggleIngredient.bind(this)
  }

  updateStorage = async(newRecipe) => {
    const cartStorage = await retrieveStorage(storage.CART_STORAGE)
    
    cartStorage.map((rep) => {
      if (rep.label === newRecipe.label) {
        rep.ingredients = newRecipe.ingredients
    }})

    await updateStorage(storage.CART_STORAGE, cartStorage)
  }

  toggleIngredient(ingredient) {
    const newIngredients = this.state.ingredients.map((i) => ({
      ing: i.ing,
      checked: (ingredient.ing === i.ing) ? !i.checked : i.checked,
    }))
    this.setState({
      ingredients: newIngredients
    }, () => {
      const { recipe } = this.props
      const newRecipe = {
        label: recipe.label,
        ingredients: newIngredients,
      }

      this.updateStorage(newRecipe)
      }) 
  }

  render() {
    const { ingredients } = this.state
    return (
      <View>
        <View style={styles.label}>
          <Text style={styles.title}>{this.props.recipe.label}</Text>
          <TouchableOpacity onPress={() => this.props.delete(this.props.recipe.label)}>
            <Ionicons style={styles.icon} name='ios-close-circle-outline' size={25} color={theme.blue} />                       
          </TouchableOpacity>
        </View>
        {ingredients.map((ing, i) => {
          return (
            <CheckBox
              key={i}
              title={ing.ing}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              textStyle={{fontWeight: 'normal'}}
              checked={ing.checked}
              onPress={() => {
                this.toggleIngredient(ing)
              }}
            />
          )
        })}
      </View>
    );
  }
}

export default RecipeListItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'Baskerville-SemiBoldItalic',
    textAlign: 'left',
    color: theme.black,
    paddingVertical: 5,
    paddingLeft: 10,
    marginVertical: 10,
    width: 250,
    alignItems: 'flex-start'
  },
  label: {
    marginVertical: 10,
    marginHorizontal: 10, 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: theme.lightBlue,
    justifyContent: 'space-around'
  },
})