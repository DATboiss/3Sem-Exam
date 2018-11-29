import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
// import { Slider } from 'react-native-elements'


export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      price: 100,
      slider: false
    }
  }

  ChangePrice = (value) => {
    this.setState({price: value})
  }

  //the slider
  SliderView = (props, ChangePrice) => {
    return ([{
      text: 'Price',
      name: 'bt_slider',
      position: 1,
      render() {
        return (
        <View>
          <Text>Choose max price</Text>
          <Slider
          style={styles.slider}
          value={props.price}
          onValueChange={(e)=>ChangePrice(e)}
          maximumValue={100}
          minimumValue={0}
          // the number to increment with for each slide
          step={1} />
          <Text>Current max price: {props.price}</Text>
          </View>
        );
      }

    }, {
      text: 'Filter',
      name: 'bt_filter',
      position: 2
    }, {
      text: 'Sort by',
      name: 'bt_sortby',
      position: 3
    }
    ]);
  }


  render = () => {

    return (

      <View style={{ color: "black", backgroundColor: "white", flex: 1, alignItems: 'center' }}>
        <Text>Price in state: {this.state.price} kr</Text>

        {/* actionbutton */}
        <FloatingAction
          actions={this.SliderView(this.state, this.ChangePrice)}
          overlayColor="none"
          // onPressMain={() => {
          //   this.setState({ slider: !this.state.slider });
          // }
          // }
        // onPressBackdrop={() => {
        //   this.setState({ slider: !this.state.slider });
        // }
        // }

        />
      </View>
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
    width: 250,
    height: 30,
  },
});
