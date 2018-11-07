import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Search from '../../components/search/Search';
import RecipeResult from '../../components/recipe/RecipeResult';
import { Header } from 'react-native-elements';

export default class SearchScreen extends React.Component {

  staticnavigationOptions= { title:'Home',}

  constructor(props) {
    super(props)
    this.state = {
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

  getRecipe = (input) => {
    const app_id = '5d0fbeb5'
    const app_key = '7bfbaaf4816774fa52ff1e1d29d28263'

    this.setState({
      recipes: []
    })

    fetch(`https://api.edamam.com/search?q=${input}&app_id=${app_id}&app_key=${app_key}`)
    .then(resData => resData.json())
    .then(data => {
      console.log(data)
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
        console.log(this.state.recipes)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Search getRecipe={this.getRecipe}/>
        <RecipeResult
          data={this.state.recipes}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
