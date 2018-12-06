import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import FlightList from './screens/FlightList'
import SearchParameter from './components/SearchParameters'
import FilterOrderButton from './components/FilterOrderButton'


const Touchable = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Text >{props.title}</Text>
  </TouchableOpacity>)

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tripType: "returntrip", date1: undefined, date2: undefined, date: undefined, resultsMounted: true,
    hideAll: false, hideButton: true, buttonFlex: 0.25, 
    compareBy: "price",
    orderBy: "asc",
    flights: [],
    sortedFlights: [],
  }
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

  setResultsMounted = (bool) => {
    this.setState({resultsMounted: bool})
  }

  setFlights = async (flights) => {
    await this.setState({flights: flights});
    await this.setState({sortedFlights: flights});
    console.log("App - setFlights - flights: " + flights + " and state.flights " + this.state.flights);
  }

  setSortedFlights = async (sortedflights) => {
    await this.setState({sortedFlights: sortedflights});
  }

  changeHideAll = () => {
    this.setState({hideAll: !this.state.hideAll});
    (this.state.buttonFlex === 0.25) ? this.setState({buttonFlex: 1}) : this.setState({buttonFlex: 0.25});
    console.log("App - changeHideAll - state.flights: " + this.state.flights);
  }
  
  changeHideButton = () => {
    this.setState({hideButton: !this.state.hideButton})
  }

  changeCompareBy = (name) => {
    this.setState({compareBy: name});
    console.log("changeCompareBy in App: " + this.state.compareBy);
  }

  static navigationOptions = { title: 'DATWays' }; //TODO CHANGE NAME
  render = () => {
    const { navigate } = this.props.navigation;
    return (
      <>
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        {(!this.state.hideAll) ? 
        <ScrollView style={{ zIndex: 0, flex: 1, flexDirection: "column" }}>
            <SearchParameter 
            state={this.state} 
            flights={this.state.sortedFlights} 
            setFlights={this.setFlights} 
            setSortedFlights={this.setSortedFlights} 
            onDataChanged={this.onDataChanged} 
            removeReturnDate={this.removeReturnDate} 
            tripType={this.tripType} 
            setTripType={this.setTripType} 
            changeHideButton={this.changeHideButton}
            resultsMounted={this.state.resultsMounted}
            setResultsMounted={this.setResultsMounted}
            compareBy={this.state.compareBy}
            />

          </ScrollView> : null}
          {(!this.state.hideButton) ? 
          <View style={{flex: this.state.buttonFlex, flexDirection: "row", height: 1, backgroundColor: "transparent"}} >
            <FilterOrderButton 
            state={this.state} 
            tripType={this.props.tripType} 
            changeHideAll={this.changeHideAll} 
            changeCompareBy={this.changeCompareBy}
            />
          </View> :
        <Text></Text>}
          
        </View>
      </>
    )
  }
}


const RouteStack = createStackNavigator({
  Home: { screen: HomeScreen },
  people: { screen: FlightList },


});

// export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />
export default App = () => <RouteStack />


const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 55,
    color: "black",
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