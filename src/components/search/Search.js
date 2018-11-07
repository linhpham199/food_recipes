import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { View } from 'react-native';
import { theme } from '../../constants/colors'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  submitInput = () => {
    this.props.getRecipe(this.state.input)
  }

  render() {
    return (
      <SearchBar
        lightTheme
        onChangeText={(input) =>  this.setState({input})}
        onSubmitEditing={this.submitInput}
        placeholder='Search'
        inputStyle={{color: theme.black}} />
    );
  }
}

export default Search;