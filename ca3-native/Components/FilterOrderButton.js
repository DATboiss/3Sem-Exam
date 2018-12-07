import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
// import { Slider } from 'react-native-elements'


export default class FilterOrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPrice: 30000,
      maxDuration: 1500,
      curPrice: 30000,
      curDuration: 1500
    }
  }

  sortFlights = (name) => {
    const realName = name.toLowerCase();

    console.log("FilterOrderButton - sortflights - name: " + realName + " , triptype = " + this.props.tripType);
    (this.props.tripType === "returntrip") ? (realName === "price") ? this.props.changeCompareBy("totalPrice") : this.props.changeCompareBy("totalDuration") : this.props.changeCompareBy(realName);

    if (
      (realName === "price" && (this.props.compareBy === "totalPrice" || this.props.compareBy === "price")) ||
      (realName === "duration" && (this.props.compareBy === "totalDuration" || this.props.compareBy === "duration")) ||
      (this.props.orderBy === "desc" && realName === "price" && (this.props.compareBy === "totalDuration" || this.props.compareBy === "duration")) ||
      (this.props.orderBy === "desc" && realName === "duration" && (this.props.compareBy === "totalPrice" || this.props.compareBy === "price"))
    ) {
      this.props.changeOrderBy();
    }

    this.props.changeOnlyShowButton();
  }

  onPriceChange = (value) => {
    this.setState({curPrice: value})
  }
  onDurationChange = (value) => {
    this.setState({curDuration: value})
  }

  filterByMaxPrice = (value) => {
    console.log("FilterOrderButton filterByMaxPrice method: maxprice value: " + value);
    let name
    (this.props.tripType === "returntrip") ? name = "totalPrice" : name = "price"
    const flights = this.props.flights.filter(flight => flight[name] <= value);
    this.props.setSortedFlights(flights);
  }
  
  filterByMaxDuration = (value) => {
    console.log("FilterOrderButton filterByMaxDuration method: maxDuration value: " + value);
    let name
    (this.props.tripType === "returntrip") ? name = "totalDuration" : name = "duration"
    const flights = this.props.flights.filter(flight => flight[name] <= value);
    this.props.setSortedFlights(flights);
  }

  Actions = (state, props, filterByMaxPrice, filterByMaxDuration, curPrice, onPriceChange, curDuration, onDurationChange) => {
    //the slider
    return ([{
      text: 'MaxPrice',
      name: 'Price',
      position: 1,
      render() {
        return (
          <View>
            <Text style={{ color: "white" }}>Choose max price</Text>
            <Slider
              style={styles.slider}
              value={state.maxPrice}
              maximumValue={state.maxPrice}
              minimumValue={0}
              onValueChange={(value) => onPriceChange(value)}
              // the number to increment with for each slide
              step={50}
              onSlidingComplete={(value) => filterByMaxPrice(value)}
            />
            <Text style={{ color: "white" }}>{curPrice} DKK</Text>
          </View>
        );
      }

    }, {
      text: 'MaxDuration',
      name: 'Duration',
      position: 2,
      render() {
        return (
          <View>
            <Text style={{ color: "white" }}>Choose max duration</Text>
            <Slider
              style={styles.slider}
              value={state.maxDuration}
              maximumValue={state.maxDuration}
              minimumValue={0}
              onValueChange={(value) => onDurationChange(value)}
              // the number to increment with for each slide
              step={5}
              onSlidingComplete={(value) => filterByMaxDuration(value)}
            />
            <Text style={{ color: "white" }}>{curDuration} minutes</Text>
          </View>
        );
      }

    }, {
      text: 'Sort By Price',
      name: 'price',
      position: 3
    }, {
      text: 'Sort By Duration',
      name: 'duration',
      position: 4
    }
    ]);
  }


  render = () => {
    return (
      <>
        <FloatingAction
          style={{ position: 'absolute', zIndex: 7 }}
          actions={this.Actions(this.state, this.props, this.filterByMaxPrice, this.filterByMaxDuration, this.state.curPrice, this.onPriceChange, this.state.curDuration, this.onDurationChange)}
          // overlayColor="lightgray"
          showBackground={false}
          dismissKeyboardOnPress={true}
          onPressItem={this.sortFlights}
          onPressMain={this.props.changeOnlyShowButton}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  picker: {
    color: 'black',
    backgroundColor: 'white',
    width: 50

  },
  slider: {
    width: 300,
    height: 30,
  },
});
