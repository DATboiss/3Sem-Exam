import React, { Component } from 'react'
import dataFacade from '../dataFacade'
import SearchParameter from './SearchParameters'
import SortContainer from './SortContainer';
import OrderParameters from './OrderParameters';
import BeatLoader from 'react-spinners/BeatLoader';



export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = { orderBy: "asc", compareBy: "price", sortedFlights: [] };
    }

    filterList = (e) => {
        const flights = this.props.flights.filter(flight => flight[e.target.name] < e.target.value);
        this.setState({ sortedFlights: flights })
    }

    getFlights = () => {
        const flights = this.state.sortedFlights
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
                {/* <div id="resultHeader">
                    <SearchParameter state={this.props.state} onDataChanged={this.props.onDataChanged} removeArrivalDate={this.props.removeArrivalDate} />
                </div> */}
                <div id="resultBodyContainer">
                    <div id="resultBodyLeft">
                        <div id="sortContainer">
                            <SortContainer onDataChanged={this.props.onDataChanged} state={this.props.state} filterList={this.filterList} />
                        </div>
                    </div>
                    <div id="resultBodyRight">
                        <div id="resultContainer">
                            <OrderParameters compareBy={this.compareBy} />
                            <ResultContainer state={this.state} getFlights={this.getFlights} compare={this.compare} setOrder={this.setOrder} compareBy={this.state.compareBy} />
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
    showFlightTimes(flight) {
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
            this.setState({ listMaxIndex: listMaxIndex + (5 % listMaxIndex) })
            this.setState({ hasMore: false })
        }
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

    displayFlights(compareBy) {
        const flights = this.props.getFlights()
            .sort((cur, next) => this.props.compare(cur[compareBy], next[compareBy], this.props.state.orderBy))
            .slice(0, this.state.listMaxIndex)
            .map((flight, i) => (<div id="result" key={i}>
                <div id="takeoff">
                    <p>DEPARTURE FLIGHT</p>
                    {this.showFlightTimes(flight)}
                    <p>
                        {flight.airline + "  "}
                        {`${flight.departure} - ${flight.destination}`}
                    </p>
                </div>
                <div id="landing">
                    <p>RETURN FLIGHT</p>
                    {this.showFlightTimes(flight)}
                    <p>
                        {flight.airline + "  "}
                        {`${flight.departure} - ${flight.destination}`}
                    </p>
                </div>
                <div id="price">
                    {`Price: ${flight.price}`}
                </div>
            </div>));
        return flights;
    }
}


