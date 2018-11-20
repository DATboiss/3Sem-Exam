import React, { Component } from 'react'
import dataFacade from '../dataFacade'


export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.getFlights();
    }

    getFlights = async () => {
        const flights = await dataFacade.getFlights();
        this.setState({ flights })

    }

    render() {
        return (
            <div>
                <ul>
                    {(this.state.flights) ? this.state.flights.map((flight, i) => (
                        <div id="resultContainer">
                            <div id="result">
                            </div>

                            <div id="takeoff" key={i}>
                                <p>DEPARTURE FLIGHT</p>
                                <p>{`${flight.depTime.slice(11, 13)}:${flight.depTime.slice(14, 16)} - ${flight.arrTime.slice(11, 13)}:${flight.arrTime.slice(14, 16)} `}
                                    {`   ${Math.floor(flight.duration / 60)}H ${flight.duration % 60}M`}</p>
                                <p>
                                    {flight.airline + "  "}
                                    {`${flight.departure} - ${flight.destination}`}</p>
                                <p>RETURN FLIGHT</p>
                                <p>{`${flight.depTime.slice(11, 13)}:${flight.depTime.slice(14, 16)} - ${flight.arrTime.slice(11, 13)}:${flight.arrTime.slice(14, 16)} `}
                                    {`   ${Math.floor(flight.duration / 60)}H ${flight.duration % 60}M`}</p>
                                <p>
                                    {flight.airline + "  "}
                                    {`${flight.departure} - ${flight.destination}`}</p>
                                <p>________________________</p>

                            </div>
                            <div>

                            </div>
                        </div>
                    ))
                        : <p>nothing found</p>}
                </ul>
            </div>

        )
    }

}