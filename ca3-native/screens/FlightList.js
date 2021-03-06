import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import CardView from 'react-native-cardview'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = { listMaxIndex: 5, hasMore: true }
  }

  showFlightTimesReturn(flight) {
    return (
      //initial flight (departure)
      [<Text>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}  |  `}
        {`${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</Text>,
      //Return flight
    <Text>{`${flight.depTime2.slice(11, 13)}:${flight.depTime2.slice(14, 16)} - ${flight.arrTime2.slice(11, 13)}:${flight.arrTime2.slice(14, 16)}  |  `}
        {`${Math.floor(flight.duration2 / 60)}H ${flight.duration2 % 60}M`}</Text>
      ]
    )
  }

  showFlightTimesOneWay(flight) {
    return (
      <Text>{`${flight.depTime.slice(11, 13)}:${flight.depTime.slice(14, 16)} - ${flight.arrTime.slice(11, 13)}:${flight.arrTime.slice(14, 16)}  |  `}
        {`${Math.floor(flight.duration / 60)}H ${flight.duration % 60}M`}</Text>
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

  displayFlights(compareBy) {
    const flights = this.props.flights
    .sort((cur, next) => this.props.compare(cur[compareBy], next[compareBy], this.props.orderBy))
      .slice(0, this.state.listMaxIndex)
      .map((flight, i) => (
        //If it's a return flight
        (flight.airline1) ?
          <Card key={i} title={`${flight.departure1} → ${flight.destination1}  |  ${flight.departure2} → ${flight.destination2} `} >
            {
              <View>
                <View style={{flexDirection: "row", justifyContent: "space-around" }}>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>DEPARTURE FLIGHT{"\n"}</Text>
                    <Text style={{ fontSize: 13 }}>{this.showFlightTimesReturn(flight)[0]}</Text>
                    <Text style={{ fontSize: 13 }}>
                      {flight.airline1}{"\n"}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>DEPARTURE FLIGHT{"\n"}</Text>
                    <Text style={{ fontSize: 13 }}>{this.showFlightTimesReturn(flight)[0]}</Text>
                    <Text style={{ fontSize: 13 }}>
                      {flight.airline2}{"\n"}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {`Price: ${flight.totalPrice * this.props.passengers}`}
                </Text>
              </View>
            }
          </Card>
          :
          //If it's a one way
          <Card key={i} title={`${flight.departure} → ${flight.destination}`} style={{ flex: 1 }}>
            {
              <View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>DEPARTURE FLIGHT{"\n"}</Text>
                  <Text style={{ fontSize: 13 }}>{this.showFlightTimesOneWay(flight)}</Text>
                  <Text style={{ fontSize: 13 }}>
                    {flight.airline}
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {`Price: ${flight.price * this.props.passengers}`}
                </Text>
              </View>
            }
          </Card>
      ));
    return flights;
  }

  render = () => {
    return (
      <View >
        {
          (this.props.flights.length > 0) ? this.displayFlights(this.props.compareBy)
            :
            (this.props.state.loading) ? <Text>Loading...</Text> : <Text style={{color: "white"}}>No flights found matching your criteria</Text>
        }
        {(this.state.listMaxIndex < this.props.flights.length) ?
          <TouchableHighlight style={styles.button} onPress={this.findNextItems} underlayColor="white">
            <View>
              <Text>More flights</Text>
            </View>
          </TouchableHighlight> : <Text></Text>}
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
