import React, { Component } from 'react';


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
    returnTrip() {
        return <form onChange={this.props.onDataChanged} onSubmit={this.props.fetchFlights}>
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
        return <form onChange={this.props.onDataChanged} onSubmit={this.props.fetchFlights}>
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
            <div>
                <button id="oneway" onClick={this.setTripType}>One Way</button>
                <button id="returntrip" onClick={this.setTripType}>Return Trip</button>
                {(this.state.tripType === "returntrip") ? this.returnTrip() : this.oneWayTrip()}

            </div>
        )
    }

}