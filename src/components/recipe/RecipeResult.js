import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { theme, imageCover } from '../../constants/colors';

import Grid from 'react-native-grid-component';

export default class RecipeResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data })
    }
  }

  _renderItem = (data, i) => {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.5}
        key={i}
        onPress={() =>
          this.props.navigation.navigate('Details', {recipe: data})}
          >
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            resizeMode='cover' 
            source={{uri: data.img}}/>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  render() {
    return (
      <Grid
        style={styles.list}
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.state.data}
        itemsPerRow={2}
        onEndReached={this.props.onEndReached}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 1,
  },
  list: {
    flex: 1,
  },
  image: { 
    flex: 1, 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    borderRadius: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center', 
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 5, 
    backgroundColor: imageCover.black50
  },
  text: {
    fontSize: 22,
    fontFamily: 'Cochin-Bold',
    width: '100%',
    color: theme.white,
    padding: 10,
    textAlign: 'center'
  }
});