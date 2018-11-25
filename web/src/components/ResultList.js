import React, { Component } from 'react';
export default class ResultList extends Component {
    constructor(props) {
        super(props);
        this.state = { listMaxIndex: 5, hasMore: true }
    }
    showFlightTimesReturn(flight) {
        return (
            //initial flight (departure)
            [<p>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}  -  `}
                {`   ${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</p>,
            //Return flight
            <p>{`${flight.depTime2.slice(11, 13)}:${flight.depTime2.slice(14, 16)} - ${flight.arrTime2.slice(11, 13)}:${flight.arrTime2.slice(14, 16)}  -  `}
                {`   ${Math.floor(flight.duration2 / 60)}H ${flight.duration2 % 60}M`}</p>
            ]
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
        if (listMaxIndex + 5 < this.props.flights.length) {
            this.setState({
                listMaxIndex: listMaxIndex + 5,
                hasMore: true
            })
        }
        else {
            this.setState({ listMaxIndex: listMaxIndex + (5 % this.props.flights.length) })
            this.setState({ hasMore: false })
        }
    }

    displayFlights(compareBy) {
        const flights = this.props.flights
            .sort((cur, next) => this.props.compare(cur[compareBy], next[compareBy], this.props.state.orderBy))
            .slice(0, this.state.listMaxIndex)
            .map((flight, i) => (
                //If it's a return flight
                (flight.airline1) ?
                    <div id="result" key={i}>
                        <div id="takeoff">
                            <p>DEPARTURE FLIGHT</p>
                            {this.showFlightTimesReturn(flight)[0]}
                            <p>
                                {flight.airline1 + "  "}
                                {`${flight.departure1} - ${flight.destination1}`}
                            </p>
                        </div>
                        <div id="landing">
                            <p>RETURN FLIGHT</p>
                            {this.showFlightTimesReturn(flight)[1]}
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
                    //If it's a one way
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
                        (this.props.state.loading) ? "Loading..." : "No flights found matching your criteria"
                }
                {(this.state.listMaxIndex < this.props.flights.length) ? <button onClick={this.findNextItems}>load more</button> : ""}
            </ul >
        )
    }

}


