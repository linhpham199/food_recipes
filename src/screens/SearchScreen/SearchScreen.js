import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Search from '../../components/search/Search';
import RecipeResult from '../../components/recipe/RecipeResult';
import { Header } from 'react-native-elements';
import { foodAPIid, foodAPIkey } from '../../constants/APIkey';

let end = 10

export default class SearchScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      recipes: [],
      recipe: {
        label: '',
        img: '',
        source: '',
        url: '',
        yield: '',
        ingredients: '',
        calories: '',
      },
    }
  }
  

  componentDidMount() {
    this.getRecipe('Dumpling')
  }

  fetchRecipe = (input) => {
    fetch(`https://api.edamam.com/search?q=${input}&app_id=${foodAPIid}&app_key=${foodAPIkey}&from=0&to=${end}`)
    .then(resData => resData.json())
    .then(data => {
      data.hits.map(rep => {
        this.setState({
          recipe: {...this.state.recipe,
            label: rep.recipe.label,
            img: rep.recipe.image,
            source: rep.recipe.source,
            url: rep.recipe.url,
            yield: rep.recipe.yield,
            ingredients: rep.recipe.ingredientLines,
            calories: Math.round(rep.recipe.calories)}
        })
        this.setState({
          recipes: [...this.state.recipes, this.state.recipe]
        })   
      })
    })
    console.log(end)
  }

  getRecipe = (input) => {
    this.setState({
      recipes: [],
      input,
    })

    end = 10

    this.fetchRecipe(input)
    
  }

  loadMoreRecipe = () => {
    end = end + 10
    this.fetchRecipe(this.state.input)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Search getRecipe={this.getRecipe}/>
        <RecipeResult
          data={this.state.recipes}
          navigation={this.props.navigation}
          onEndReached={this.loadMoreRecipe}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
