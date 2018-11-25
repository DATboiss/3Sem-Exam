import React, { Component } from 'react'
import Filter from './Filter';
import OrderParameters from './OrderParameters';
import BeatLoader from 'react-spinners/BeatLoader';



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

    filterList = (e) => {
        e.preventDefault();
        const flights = this.props.flights.filter(flight => flight[e.target.name] < e.target.value);
        this.setState({ sortedFlights: flights })
    }

    getFlights = () => {
        const flights = this.state.sortedFlights;
        return flights;
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
            <div>
                <div id="resultBodyContainer">
                    <div id="resultBodyLeft">
                        <div id="sortContainer">
                            <Filter onDataChanged={this.props.onDataChanged} state={this.props.state} filterList={this.filterList} tripType={this.props.tripType} />
                        </div>
                    </div>
                    <div id="resultBodyRight">
                        <div id="resultContainer">
                            <OrderParameters compareBy={this.compareBy} tripType={this.props.tripType} />
                            <ResultContainer state={this.state} getFlights={this.getFlights} compare={this.compare} setOrder={this.setOrder} compareBy={this.state.compareBy} tripType={this.props.tripType} />
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

class ResultContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { listMaxIndex: 5, hasMore: true }
    }
    showFlightTimesReturn(flight) {
        return (
            <p>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}  -  `}
                {`   ${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</p>
        )
    }
    showFlightTimesOneWay(flight) {
        return (
            <p>{`${flight.depTime.slice(11, 13)}:${flight.depTime.slice(14, 16)} - ${flight.arrTime.slice(11, 13)}:${flight.arrTime.slice(14, 16)}  -  `}
                {`   ${Math.floor(flight.duration / 60)}H ${flight.duration % 60}M`}</p>
        )
    }

    findNextItems = () => {
        const { listMaxIndex } = this.state;
        if (listMaxIndex + 5 < this.props.getFlights().length) {
            this.setState({
                listMaxIndex: listMaxIndex + 5,
                hasMore: true
            })
        }
        else {
            this.setState({ listMaxIndex: listMaxIndex + (5 % this.props.getFlights().length) })
            this.setState({ hasMore: false })
        }
    }

    displayFlights(compareBy) {
        const flights = this.props.getFlights()
            .sort((cur, next) => this.props.compare(cur[compareBy], next[compareBy], this.props.state.orderBy))
            .slice(0, this.state.listMaxIndex)
            .map((flight, i) => (
                //If it's a return flight
                (flight.airline1) ?
                    <div id="result" key={i}>
                        <div id="takeoff">
                            <p>DEPARTURE FLIGHT</p>
                            {this.showFlightTimesReturn(flight)}
                            <p>
                                {flight.airline1 + "  "}
                                {`${flight.departure1} - ${flight.destination1}`}
                            </p>
                        </div>
                        <div id="landing">
                            <p>RETURN FLIGHT</p>
                            {this.showFlightTimesReturn(flight)}
                            <p>
                                {flight.airline2 + "  "}
                                {`${flight.departure2} - ${flight.destination2}`}
                            </p>
                        </div>
                        <div id="price">
                            {`Price: ${flight.totalPrice}`}
                        </div>

                    </div>
                    :
                    //If it's a oneway
                    <div id="result" key={i}>
                        <div id="takeoff">
                            <p>DEPARTURE FLIGHT</p>
                            {this.showFlightTimesOneWay(flight)}
                            <p>
                                {flight.airline + "  "}
                                {`${flight.departure} - ${flight.destination}`}
                            </p>
                        </div>
                        <div id="price">
                            {`Price: ${flight.price}`}
                        </div>
                    </div>
            ));
        return flights;
    }

    render() {
        return (
            <ul>
                {
                    (this.props.state.sortedFlights.length > 0) ? this.displayFlights(this.props.compareBy)
                        :
                        (this.props.state.loading) ? <BeatLoader /> : "No flights found matching your criteria"
                }
                {(this.state.listMaxIndex < this.props.getFlights().length) ? <button onClick={this.findNextItems}>load more</button> : ""}
            </ul >
        )
    }

}


