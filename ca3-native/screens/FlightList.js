import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import CardView from 'react-native-cardview'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = { listMaxIndex: 5, hasMore: true }
    console.log(props);

  }
  showFlightTimesReturn(flight) {
    return (
      //initial flight (departure)
      [<Text>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}  -  `}
        {`   ${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</Text>,
      //Return flight
      <Text>{`${flight.depTime2.slice(11, 13)}:${flight.depTime2.slice(14, 16)} - ${flight.arrTime2.slice(11, 13)}:${flight.arrTime2.slice(14, 16)}  -  `}
        {`   ${Math.floor(flight.duration2 / 60)}H ${flight.duration2 % 60}M`}</Text>
      ]
    )
  }
  showFlightTimesOneWay(flight) {
    return (
      <Text>{`${flight.depTime.slice(11, 13)}:${flight.depTime.slice(14, 16)} - ${flight.arrTime.slice(11, 13)}:${flight.arrTime.slice(14, 16)}  -  `}
        {`   ${Math.floor(flight.duration / 60)}H ${flight.duration % 60}M`}</Text>
    )
  }

  findNextItems = () => {
    const { listMaxIndex } = this.state;
    if (listMaxIndex + 5 < this.props.flights.length) {
      this.setState({
        listMaxIndex: listMaxIndex + 5,
        hasMore: true
      })
    }
    else {
      this.setState({ listMaxIndex: listMaxIndex + (5 % this.props.flights.length) })
      this.setState({ hasMore: false })
    }
  }

  displayFlights() {
    const flights = this.props.flights
      .slice(0, this.state.listMaxIndex)
      .map((flight, i) => (
        //If it's a return flight
        (flight.airline1) ?
          <Card key={i} title={`${flight.departure1} - ${flight.destination1}  |  ${flight.departure2} - ${flight.destination2} `}>
            {
              <View>
                <View>
                  <Text>DEPARTURE FLIGHT
                  {this.showFlightTimesReturn(flight)[0]}
                  </Text>
                  <Text>
                    {flight.airline1 + "  "}
                    {`${flight.departure1} - ${flight.destination1}`}
                  </Text>
                </View>
                <View>
                  <Text>RETURN FLIGHT
                  {this.showFlightTimesReturn(flight)[1]}
                  </Text>
                  <Text>
                    {flight.airline2 + "  "}
                    {`${flight.departure2} - ${flight.destination2}`}
                  </Text>
                </View>
                <Text>
                  {`Price: ${flight.totalPrice}`}
                </Text>
              </View>
            }
          </Card>
          :
          //If it's a one way
          <Card key={i} title={`${flight.departure} - ${flight.destination}`}>
            {
              <View>
                <View>
                  <Text>DEPARTURE FLIGHT
                  {this.showFlightTimesOneWay(flight)[0]}
                  </Text>
                  <Text>
                    {flight.airline + "  "}
                    {`${flight.departure} - ${flight.destination}`}
                  </Text>
                </View>
                <View>
                  <Text>RETURN FLIGHT
                  {this.showFlightTimesOneWay(flight)[1]}
                  </Text>
                  <Text>
                    {flight.airline + "  "}
                    {`${flight.departure} - ${flight.destination}`}
                  </Text>
                </View>
                <Text>
                  {`Price: ${flight.price}`}
                </Text>
              </View>
            }
          </Card>
      ));
    return flights;
  }

  render() {
    return (
      <View>
        {
          (this.props.flights.length > 0) ? this.displayFlights()
            :
            (this.props.state.loading) ? "Loading..." : "No flights found matching your criteria"
        }
        {(this.state.listMaxIndex < this.props.flights.length) ?
          <TouchableHighlight style={styles.button} onPress={this.findNextItems} underlayColor="white">
            <View>
              <Text>More flights</Text>
            </View>
          </TouchableHighlight> : ""}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "yellow",
    textShadowColor: 'rgba(255, 255, 0, 1)',
    textShadowOffset: { width: -0.5, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  picker: {
    color: 'black',
    backgroundColor: 'white',
    width: 50

  }
});
