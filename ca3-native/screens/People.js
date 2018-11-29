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
      maxPrice: 100000
    }
  }

  ChangePrice = (value) => {
    this.setState({price: value})
  }

  setMaxPrice = (value) => {
    this.setState({maxPrice: value})
  }

  //the slider
  SliderView = (props, ChangePrice, setMaxPrice) => {
    return ([{
      text: 'MaxPrice',
      name: 'bt_slider',
      position: 1,
      render() {
        return (
        <View>
          <Text>Choose max price</Text>
          <Slider
          style={styles.slider}
          value={props.price}
          maximumValue={props.maxPrice}
          minimumValue={0}
          onValueChange={(e) => ChangePrice(e)}
          // the number to increment with for each slide
          step={1}
          onSlidingComplete={(e) => setMaxPrice(e)}
          />
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
        <Text>MaxPrice in state: {this.state.maxPrice} kr</Text>

        {/* actionbutton */}
        <FloatingAction
          actions={this.SliderView(this.state, this.ChangePrice, this.setMaxPrice)}
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
    width: 300,
    height: 30,
  },
});
