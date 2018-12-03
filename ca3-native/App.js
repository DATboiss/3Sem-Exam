import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import FlightList from './screens/FlightList'
import SearchParameter from './Components/SearchParameters'


const Touchable = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Text >{props.title}</Text>
  </TouchableOpacity>)

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tripType: "returntrip", date1: undefined, date2: undefined, date: undefined }
  }
  onDataChanged = (name, value) => {
    this.setState({ [name]: value })
  }
  removeReturnDate = () => {
    this.setState({ dateReturn: undefined });
  }

  setTripType = async (name) => {
    if (name === "oneway") {
      this.removeReturnDate();
    }
    await this.setState({ tripType: name })
  }

  static navigationOptions = { 
    title: 'DATWays',
    headerStyle: {
      backgroundColor: "#011E2F"
    },
    headerTitleStyle: {
      color: "white"
    } 
  }; //TODO CHANGE NAME
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ backgroundColor: "#022C45" }}>
        <SearchParameter state={this.state} onDataChanged={this.onDataChanged} removeArrivalDate={this.removeArrivalDate} tripType={this.tripType} setTripType={this.setTripType} />
      </ScrollView>
    )
  }
}


const RouteStack = createStackNavigator({
  Home: { screen: HomeScreen },
  people: { screen: FlightList },


});

export default App = () => <RouteStack />


const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    fontSize: 55,
    color: "#022C45",
    textShadowColor: 'rgba(255, 255, 0, 1)',
    textShadowOffset: { width: -0.75, height: 0.25 },
    textShadowRadius: 5,
  },

  button: {
    margin: 3,
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: 65,
  },
  buttonText: {
    padding: 7,
    fontSize: 35,
    fontFamily: 'Roboto',
    fontWeight: "bold",
    color: '#444444',
  }
})