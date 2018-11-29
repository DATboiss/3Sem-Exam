import React, { Component } from 'react';
import Result from './Result'
import dataFacade from '../dataFacade'
import BeatLoader from 'react-spinners/BeatLoader'


export default class SearchParameter extends Component {
    constructor(props) {
        super(props);
        this.state = { tripType: "returntrip", resultsMounted: true, searched: false };
    }

    setTripType = (e) => {
        if (e.target.id === "oneway") {
            this.props.removeReturnDate();
        }
        this.setState({ tripType: e.target.id })
    }

    fetchFlights = async (e) => {
        e.preventDefault();
        this.setState({ resultsMounted: true, searched: true })
        const { departureLoc, arrivalLoc, dateDeparture, dateReturn } = this.props.state;
        if (this.props.state.tripType === "returntrip") {
            const flights = await dataFacade.getReturnRoutes(departureLoc, arrivalLoc, dateDeparture, dateReturn)
            this.setState({ flights: flights, resultsMounted: false, searched: false })
        }
        else {
            const flights = await dataFacade.getOneWayRoutes(departureLoc, arrivalLoc, dateDeparture)
            this.setState({ flights: flights, resultsMounted: false, searched: false })
        }
    }

    returnTrip() {
        return <form onChange={this.props.onDataChanged} onSubmit={this.fetchFlights}>
            <input type="text" name="departureLoc" placeholder="Departure" />
            <input type="text" name="arrivalLoc" placeholder="Destination" />
            <input type="date" name="dateDeparture" placeholder="Departure Date" />
            <input type="date" name="dateReturn" placeholder="Return Date" />
            {/* <input type="text" name="passengers" /> */}
            <button>Submit</button>
        </form>
    }

    oneWayTrip() {
        return <form onChange={this.props.onDataChanged} onSubmit={this.fetchFlights}>
            <input type="text" name="departureLoc" placeholder="Departure" />
            <input type="text" name="arrivalLoc" placeholder="Destination" />
            <input type="date" name="dateDeparture" />
            {/* <input type="text" name="passengers" /> */}
            <button>Submit</button>
        </form>
    }

    render() {
        return (
            <>
                <div>
                    <button id="oneway" onClick={this.props.setTripType}>One Way</button>
                    <button id="returntrip" onClick={this.props.setTripType}>Return Trip</button>
                    {(this.props.state.tripType === "returntrip") ? this.returnTrip() : this.oneWayTrip()}
                </div>
                <div>

                    {
                        (this.state.resultsMounted) ? 
                        (this.state.searched) ? <BeatLoader /> : "" 
                        : <Result state={this.props.state} onDataChanged={this.props.onDataChanged} flights={this.state.flights} tripType={this.props.tripType} />
                    }
                </div>
            </>
        )
    }

}