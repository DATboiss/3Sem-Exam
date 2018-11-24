import React, { Component } from 'react';
import Result from './Result'
import dataFacade from '../dataFacade'


export default class SearchParameter extends Component {
    constructor(props) {
        super(props);
        this.state = { tripType: "returntrip" };
    }

    setTripType = (e) => {
        if (e.target.id === "oneway") {
            this.props.removeArrivalDate();
        }
        this.setState({ tripType: e.target.id })
    }

    fetchFlights = async (e) => {
        e.preventDefault();
        console.log("loading")

        const { departureLoc, arrivalLoc, dateDeparture, dateArrival } = this.props.state;
        if (this.props.state.tripType === "returntrip") {
            this.setState({ loading: true })
            const flights = await dataFacade.getReturnRoutes(departureLoc, arrivalLoc, dateDeparture, dateArrival)
            this.setState({ flights: flights, loading: false })
        }
        else {
            this.setState({ loading: true })
            const flights = await dataFacade.getOneWayRoutes(departureLoc, arrivalLoc, dateDeparture)
            this.setState({ flights: flights, loading: false })
        }
        console.log(this.props.state.tripType)
    }

    returnTrip() {
        return <form onChange={this.props.onDataChanged} onSubmit={this.fetchFlights}>
            <input type="text" name="departureLoc" placeholder="Departure" />
            <input type="text" name="arrivalLoc" placeholder="Destination" />
            <input type="date" name="dateDeparture" placeholder="Departure Date" />
            <input type="date" name="dateArrival" placeholder="Arrival Date" />
            <input type="text" name="passengers" />
            <button>Submit</button>
            <p>{JSON.stringify(this.props.state)}</p>
        </form>
    }

    oneWayTrip() {
        return <form onChange={this.props.onDataChanged} onSubmit={this.fetchFlights}>
            <input type="text" name="departureLoc" placeholder="Departure" />
            <input type="text" name="arrivalLoc" placeholder="Destination" />
            <input type="date" name="dateArrival" />
            <input type="text" name="passengers" />
            <button>Submit</button>
            <p>{JSON.stringify(this.props.state)}</p>
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
                    <Result state={this.props.state} onDataChanged={this.props.onDataChanged} flights={this.state.flights} />
                </div>
            </>
        )
    }

}