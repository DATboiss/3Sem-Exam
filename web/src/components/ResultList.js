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
          <div className="card" key={i}>
            <div className="card-header">
              <div className="card-title">{`${flight.departure1} → ${flight.destination1} | ${flight.departure2} → ${flight.destination2}`}</div>
            </div>

<<<<<<< HEAD
            <div className="card-body">
              <div className="columns col-gapless">
                <div className="column col-9 col-xs-12 col-sm-12">
                  <div className="columns">
                    <div className="column col-6 col-sm-4 is-data">
                      <div>
                        <time>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}`}</time>
                      </div>
                      <div className="is-normal">{flight.airline1}</div>
                    </div>
                    <div className="column col-3 col-sm-4 is-data">
                      <div>non-stop</div>
                    </div>
                    <div className="column col-3 col-sm-4 is-data">
                      <div>
                        <time>{`${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</time>
                      </div>
                      <div className="is-normal">{flight.departure1} → <mark>{flight.destination1}</mark></div>
                    </div>
                  </div>
                  <div className="columns is-data">
                    <div className="column col-6 col-sm-4 is-data">
                      <div>
                        <time>{`${flight.depTime2.slice(11, 13)}:${flight.depTime2.slice(14, 16)} - ${flight.arrTime2.slice(11, 13)}:${flight.arrTime2.slice(14, 16)}`}</time>
                      </div>
                      <div className="is-normal">{flight.airline2}</div>
                    </div>
                    <div className="column col-3 col-sm-4 is-data">
                      <div>non-stop</div>
                    </div>
                    <div className="column col-3 col-sm-4 is-data">
                      <div>
                        <time>{`${Math.floor(flight.duration2 / 60)}H ${flight.duration2 % 60}M`}</time>
                      </div>
                      <div className="is-normal">{flight.departure2} → <mark>{flight.destination2}</mark></div>
                    </div>
                  </div>
                </div>
                <div className="column col-3 col-xs-12 col-sm-12 is-actions">
                  <div className="columns">
                    <div className="column col-12 col-xs-6 col-sm-4 is-data is-price">
                      <a className="heading" href="https://www.emilvh.dk/DATWaysDummyPage/" data-toggle="trip-favorite">Add to trip <svg className="icon icon-heart"><use xlinkHref="#icon-heart"></use></svg></a>
                      <div className="h3">{flight.totalPrice} <small>DKK</small></div>
                    </div>
                    <div className="column col-12 col-xs-6 col-sm-8 is-action">
                      <div className="dropdown is-wide">
                        <div className="btn-group btn-group-block"><a className="btn btn-success" href="https://www.emilvh.dk/DATWaysDummyPage/">View deal</a><a className="btn btn-success dropdown-toggle" tabIndex="0" href="https://www.emilvh.dk/DATWaysDummyPage/"><i className="icon icon-caret"></i></a>
=======
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
>>>>>>> react_native
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="card" key={i}>
            <div className="card-header">
              <div className="card-title">{`${flight.departure} → ${flight.destination}`}</div>
            </div>

            <div className="card-body">
              <div className="columns col-gapless">
                <div className="column col-9 col-xs-12 col-sm-12">
                  <div className="columns">
                    <div className="column col-6 col-sm-4 is-data">
                      <div>
                        <time>{`${flight.depTime.slice(11, 13)}:${flight.depTime.slice(14, 16)} - ${flight.arrTime.slice(11, 13)}:${flight.arrTime.slice(14, 16)}`}</time>
                      </div>
                      <div className="is-normal">{flight.airline}</div>
                    </div>
                    <div className="column col-3 col-sm-4 is-data">
                      <div>non-stop</div>
                    </div>
                    <div className="column col-3 col-sm-4 is-data">
                      <div>
                        <time>{`${Math.floor(flight.duration / 60)}H ${flight.duration % 60}M`}</time>
                      </div>
                      <div className="is-normal">{flight.departure} → <mark>{flight.destination}</mark></div>
                    </div>
                  </div>
                </div>
                <div className="column col-3 col-xs-12 col-sm-12 is-actions">
                  <div className="columns">
                    <div className="column col-12 col-xs-6 col-sm-4 is-data is-price">
                      <a className="heading" href="https://www.emilvh.dk/DATWaysDummyPage/" data-toggle="trip-favorite">Add to trip <svg className="icon icon-heart"><use xlinkHref="#icon-heart"></use></svg></a>
                      <div className="h3">{flight.price} <small>DKK</small></div>
                    </div>
                    <div className="column col-12 col-xs-6 col-sm-8 is-action">
                      <div className="dropdown is-wide">
                        <div className="btn-group btn-group-block">
                        <a className="btn btn-success" href="https://www.emilvh.dk/DATWaysDummyPage/">View deal</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ));
    return flights;
  }

  render() {
    return (
      <ul>
        {
          (this.props.sortedFlights.length > 0) ? this.displayFlights(this.props.compareBy)
            :
            (this.props.state.loading) ? "Loading..." : <span style={{color: "red"}}>No flights found matching your criteria</span>
        }
        {(this.state.listMaxIndex < this.props.flights.length) ? <button className="btn btn-primary btn-lg col-12" onClick={this.findNextItems}>load more</button> : ""}
      </ul >
    )
  }

}


