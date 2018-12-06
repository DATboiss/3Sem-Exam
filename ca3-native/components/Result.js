import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, StyleSheet, View, TouchableHighlight } from 'react-native';
import Filter from './Filter';
import OrderParameters from './OrderParameters';
import FlightList from '../screens/FlightList'


export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: "asc",
            compareBy: (this.props.tripType === "returntrip") ? "totalPrice" : "price",
            sortedFlights: this.props.flights,
            flights: this.props.flights
        };
    }

    filterList = (name, value) => {
        console.log("Result filterList method: name: " + name + " value: " + value);
        e.preventDefault();
        const flights = this.props.flights.filter(flight => flight[name] <= value);
        this.setState({ sortedFlights: flights })
    }

    compare = (a, b, orderBy) => {
        if (orderBy === "asc")
            return a - b;
        else
            return b - a;
    }

    compareBy = (e) => {
        this.setOrder(e);
        this.setState({
            compareBy: e
        })
    }

    setOrder = (eventName) => {
        const { orderBy, compareBy } = this.state;
        if (orderBy === "desc" || compareBy !== eventName) {
            this.setState({ orderBy: "asc" })
        } else {
            this.setState({ orderBy: "desc" })
        }
        return orderBy;
    }



    render = () => {
        console.log("Result " + this.state.flights);
        return (
            <>
                <View >
                    {/* <Filter onDataChanged={this.props.onDataChanged} state={this.props.state} filterList={this.filterList} tripType={this.props.tripType} /> */}
                    {/* <OrderParameters compareBy={this.compareBy} tripType={this.props.tripType} /> */}
                    <FlightList state={this.state} flights={this.props.flights} compare={this.compare} setOrder={this.setOrder} compareBy={this.compareBy} tripType={this.props.tripType} />
                    
                </View>
            </>

        )
    }

}

