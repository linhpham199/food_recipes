import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { theme, imageCover } from '../../constants/colors';
import{ Ionicons }  from'@expo/vector-icons';

class DetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: this.props.navigation.state.params.recipe
    }
  }
  render() {
    console.log(this.state.recipe)
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
  }
})