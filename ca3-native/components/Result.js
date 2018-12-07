import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, StyleSheet, View, TouchableHighlight } from 'react-native';
import FlightList from '../screens/FlightList'


export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    compare = (a, b, orderBy) => {
        if (orderBy === "asc")
            return a - b;
        else
            return b - a;
    }

    compareByMethod = (e) => {
        this.setOrder(e);
        this.props.changeCompareBy(e);
    }

    setOrder = (eventName) => {
        const orderBy = this.props.orderBy;
        const compareBy = this.props.compareBy;
        if (orderBy === "desc" || compareBy !== eventName) {
            this.props.changeOrderBy("asc");
        } else {
            this.props.changeOrderBy("desc");
        }
        return orderBy;
    }



    render = () => {
        return (
            <>
                <View >
                    <FlightList
                        state={this.state}
                        flights={this.props.flights}
                        compare={this.compare}
                        setOrder={this.setOrder}
                        compareBy={this.props.compareBy}
                        compareByMethod={this.compareByMethod}
                        orderBy={this.props.orderBy}
                        tripType={this.props.tripType}
                        passengers={this.props.passengers} />

                </View>
            </>

        )
    }

}

