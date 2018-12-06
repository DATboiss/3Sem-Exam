import React, { Component } from 'react'
import Filter from './Filter';
import OrderParameters from './OrderParameters';
import ResultList from './ResultList'


export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: "asc",
            compareBy: (this.props.tripType === "returntrip") ? "totalPrice" : "price",
            flights: this.props.flights
        };
    }



    compare = (a, b, orderBy) => {
        if (orderBy === "asc")
            return a - b;
        else
            return b - a;
    }

    compareBy = (e) => {
        this.setOrder(e.target.name);
        this.setState({
            compareBy: e.target.name
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
    render() {
        return (
            <>
                <OrderParameters compareBy={this.compareBy} tripType={this.props.tripType} />
                <ResultList state={this.state} flights={this.props.sortedFlights} compare={this.compare} setOrder={this.setOrder} compareBy={this.state.compareBy} tripType={this.props.tripType} sortedFlights={this.props.sortedFlights} />
                <Filter onDataChanged={this.props.onDataChanged} state={this.props.state} filterList={this.filterList} tripType={this.props.tripType} />
            </ >


        )
    }

}

