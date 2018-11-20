import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, View } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { googleAPIkey } from '../../constants/APIkey';
import { theme } from '../../constants/colors';

class MapScreen extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      address: '',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      },
      markets: [],
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = async() => {
    let { status } =  await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        region: {...this.state.region, latitude: location.coords.latitude, longitude: location.coords.longitude}
      }, () => this.showMarkets())
      
    }
  }

  updateMap = (address) => {
    console.log(address)
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.convertAdress(address) + '&key=' + googleAPIkey)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.results.length > 0) {
          const region = {
            ...this.state.region,
            latitude: parseFloat(responseJSON.results[0].geometry.location.lat),
            longitude: parseFloat(responseJSON.results[0].geometry.location.lng),
          }
          this.setState({ region }, () => this.showMarkets())
          
        }
      })
    .catch((error) => {
      console.log(error)
    })
  }

  convertAdress(address) {
    return (
      address.replace(/\s/g, "+")
    )
  }

  showMarkets = () => {
    const { region } = this.state
    const placeCoords = region.latitude + ',' + region.longitude
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + placeCoords + '&radius=2000&type=supermarket&key=' + googleAPIkey)
      .then((response) => response.json())
      .then((responseJSON) => {
        let markets = []
        responseJSON.results.forEach((row) => {
          markets = [...markets, {
            location: row.geometry.location,
            name: row.name,
            address: row.vicinity,
          }]
        })
        this.setState({ markets })
      })
      .catch(err => console.log(err))
  }

  render() {
    const disableButton = this.state.address === ''
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <MapView style={{flex:1}} 
                 region={this.state.region}>
          {this.state.markets.map((market, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude : market.location.lat,
                  longitude: market.location.lng,
                }}
                title={market.name}
                description={market.address} />
            )
          })}
        </MapView>
        <TextInput 
          onChangeText={(address) => this.setState({address})}
          placeholder='Enter address and city'
          value={this.state.address}
          style={styles.input}
          onSubmitEditing={() => this.updateMap(this.state.address)}/>

      </KeyboardAvoidingView>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderColor: theme.white,
    borderWidth: 1,
    height: 35,
  },
});