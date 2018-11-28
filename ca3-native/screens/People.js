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

  //the slider
  SliderView = () => {
    return <Slider
      style={styles.slider}
      value={this.state.price}
      onValueChange={(price) => this.setState({ price })}
      maximumValue={100}
      minimumValue={0}
      // the number to increment with for each slide
      step={1} />
  }


  async componentDidMount() {

  }

  render() {

    const actions = [{
      text: 'Price',
      name: 'bt_slider',
      position: 1,
      render() {
        return (<Slider
      style={styles.slider}
      maximumValue={100}
      minimumValue={0}
      // the number to increment with for each slide
      step={1} />);
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
    ];
    return (

      <View style={{ color: "black", backgroundColor: "white", flex: 1, alignItems: 'center' }}>
        <this.SliderView />
        <Text>Selected price: {this.state.price} kr</Text>

        {/* actionbutton */}
        <FloatingAction 
          actions={actions}
          onPressMain={() => {
            this.setState({ slider: !this.state.slider });
          }
          }
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
    height: 150,
  },
});
