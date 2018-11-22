import React, { Component } from 'react'
import dataFacade from '../dataFacade'
import SearchParameter from './SearchParameters'
import SortContainer from './SortContainer';
import OrderParameters from './OrderParameters';
import BeatLoader from 'react-spinners/BeatLoader';



export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = { orderBy: "asc", flights: [], sortedFlights: [] };
    }
    componentDidMount() {
        this.fetchFlights();
    }

    fetchFlights = async () => {
        this.setState({ loading: true })
        const flights = await dataFacade.getFlights();
        this.setState({ flights: flights, sortedFlights: flights, loading: false })
    }

    filterList = (e) => {
        const flights = this.state.flights.filter(flight => flight[e.target.name] < e.target.value);
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


    setOrder = () => {
        if (this.state.orderBy === "asc") {
            this.setState({ orderBy: "desc" })
        } else {
            this.setState({ orderBy: "asc" })
        }
        return this.state.orderBy;
    }

    render() {
        return (
            <div>
                <div id="resultHeader">
                    <SearchParameter state={this.props.state} onDataChanged={this.props.onDataChanged} removeArrivalDate={this.props.removeArrivalDate} />
                </div>
                <div id="resultBodyContainer">
                    <div id="resultBodyLeft">
                        <div id="sortContainer">
                            <SortContainer onDataChanged={this.props.onDataChanged} state={this.props.state} filterList={this.filterList} />
                        </div>
                    </div>
                    <div id="resultBodyRight">
                        <div id="resultContainer">
                            <OrderParameters setOrder={this.setOrder} />
                            <ResultContainer state={this.state} getFlights={this.getFlights} compare={this.compare} />
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
        if (listMaxIndex + 5 < this.props.getFlights().length)
        {
            console.log(listMaxIndex % 5)
        this.setState({ listMaxIndex: listMaxIndex + 5 })}
        else  {
            this.setState({ listMaxIndex: listMaxIndex + (5 % listMaxIndex) })
            this.setState({ hasMore: false })
        }
    }

    render() {
        return (
            <ul>
                {
                    (this.props.state.sortedFlights.length > 0) ? this.props.getFlights()
                        .sort((v, n) =>
                            this.props.compare(v.price, n.price, this.props.state.orderBy))
                        .slice(0, this.state.listMaxIndex)
                        .map((flight, i) => (
                            <div id="result" key={i}>
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
                            </div>
                        ))
                        :
                        (this.props.state.loading) ? <BeatLoader /> : "No flights found matching your criteria"}
                {(this.state.hasMore) ? <button onClick={this.findNextItems}>load more</button> : ""}
            </ul >
        )
    }
}


