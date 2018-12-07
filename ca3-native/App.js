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
    this.state = {
      tripType: "returntrip",
      date1: undefined,
      date2: undefined,
      date: undefined,
      passengers: undefined,
      resultsMounted: true,
      onlyShowButton: false,
      buttonFlex: 0.25,
      compareBy: "totalPrice",
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
    this.setState({ resultsMounted: bool })
  }

  setFlights = async (flights) => {
    await this.setState({ flights: flights });
    await this.setState({ sortedFlights: flights });
  }

  setSortedFlights = async (sortedFlights) => {
    await this.setState({ sortedFlights: sortedFlights });
    console.log("App - setSortedFlights - sortedFlights: " + sortedFlights + " and state.flights " + this.state.sortedFlights);
  }

  changeOnlyShowButton = () => {
    this.setState({ onlyShowButton: !this.state.onlyShowButton });
    (this.state.buttonFlex === 0.25) ? this.setState({ buttonFlex: 1 }) : this.setState({ buttonFlex: 0.25 });
  }

  changeCompareBy = async (name) => {
    await this.setState({ compareBy: name });
    console.log("changeCompareBy in App: " + this.state.compareBy);
  }

  changeOrderBy = () => {
    (this.state.orderBy === "asc") ? this.setState({orderBy: "desc"}) : this.setState({orderBy: "asc"})
    console.log("changeOrderBy in App: " + this.state.orderBy);
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
  render = () => {
    const { navigate } = this.props.navigation;
    return (
      <>
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", backgroundColor: "#022C45" }}>
          {(!this.state.onlyShowButton) ?
            <ScrollView style={{ zIndex: 0, flex: 1, flexDirection: "column" }}>
              <SearchParameter
                state={this.state}
                flights={this.state.sortedFlights}
                setFlights={this.setFlights}
                setSortedFlights={this.setSortedFlights}
                onDataChanged={this.onDataChanged}
                removeReturnDate={this.removeReturnDate}
                tripType={this.state.tripType}
                setTripType={this.setTripType}
                resultsMounted={this.state.resultsMounted}
                setResultsMounted={this.setResultsMounted}
                compareBy={this.state.compareBy}
                orderBy={this.state.orderBy}
                passengers={this.state.passengers}
              />

            </ScrollView> : null}
          {(this.state.flights.length > 0) ?
            <View style={{ flex: this.state.buttonFlex, flexDirection: "row", height: 1, backgroundColor: "transparent" }} >
              <FilterOrderButton
                state={this.state}
                tripType={this.state.tripType}
                flights={this.state.flights}
                setSortedFlights={this.setSortedFlights}
                compareBy={this.state.compareBy}
                changeCompareBy={this.changeCompareBy}
                orderBy={this.state.orderBy}
                changeOrderBy={this.changeOrderBy}
                changeOnlyShowButton={this.changeOnlyShowButton}
              />
            </View> : null
            }

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