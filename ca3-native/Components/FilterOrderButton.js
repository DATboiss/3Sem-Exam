import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
// import { Slider } from 'react-native-elements'
import FlightList from '../screens/FlightList'


export default class FilterOrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPrice: 30000,
      maxDuration: 1500
    }
  }

  sortFlights = (name) => {
    (this.props.tripType === "returntrip") ? (name === "price") ? this.props.changeCompareBy(totalPrice) : this.props.changeCompareBy(duration1) : this.props.changeCompareBy(name);
    this.props.changeHideAll();
    console.log("FilterOrderButton - sortflights - name: " + name);
  }

  Actions = (state, props) => {
    //the slider
    return ([{
      text: 'MaxPrice',
      name: 'bt_maxPrice',
      position: 1,
      render() {
        return (
          <View>
            <Text>Choose max price</Text>
            <Slider
              style={styles.slider}
              value={state.maxPrice}
              maximumValue={30000}
              minimumValue={0}
              // onValueChange={(e) => ChangePrice(e)}
              // the number to increment with for each slide
              step={1}
              onSlidingComplete={(value) => props.filterList((props.tripType === "returntrip") ? "totalPrice" : "price", value)}
            />
            <Text>Current max price: {"?"}</Text>
          </View>
        );
      }

    }, {
      text: 'MaxDuration',
      name: 'bt_maxDuration',
      position: 2,
      render() {
        return (
          <View>
            <Text>Choose max duration</Text>
            <Slider
              style={styles.slider}
              value={state.maxDuration}
              maximumValue={1500}
              minimumValue={0}
              // onValueChange={(e) => ChangePrice(e)}
              // the number to increment with for each slide
              step={1}
              onSlidingComplete={(e) => setMaxDuration(e)}
            />
            <Text>Current max price: {"?"}</Text>
          </View>
        );
      }

    }, {
      text: 'Order By Price',
      name: 'price',
      position: 3
    }, {
      text: 'Order By Duration',
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
          actions={this.Actions(this.state, this.props)}
          overlayColor="lightgray"
          showBackground={false}
          dismissKeyboardOnPress={true}
          // onPressItem={(e) => this.setOrderBy(e) }
          onPressItem={this.sortFlights}
          onPressMain={this.props.changeHideAll}
          onPressBackdrop={this.props.changeHideAll}
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
