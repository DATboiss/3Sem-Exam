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
            // .sort((cur, next) => this.props.compare(cur[compareBy], next[compareBy], this.props.state.orderBy))
            // .slice(0, this.state.listMaxIndex)
            .map((flight, i) => (
                //If it's a return flight
                (flight.airline1) ?
                    <div class="card">
                    <div class="card-header">
                      <div class="card-title">{`${flight.departure1} → ${flight.destination1} | ${flight.departure2} → ${flight.destination2}`}</div>
                    </div>
            
                    <div class="card-body">
                      <div class="columns col-gapless">
                        <div class="column col-9 col-xs-12 col-sm-12">
                          <div class="columns">
                            <div class="column col-6 col-sm-4 is-data">
                              <div>
                                <time>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}`}</time>
                              </div>
                              <div class="is-normal">{flight.airline1}</div>
                            </div>
                            <div class="column col-3 col-sm-4 is-data">
                              <div>non-stop</div>
                            </div>
                            <div class="column col-3 col-sm-4 is-data">
                              <div>
                                <time>{`${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</time>
                              </div>
                              <div class="is-normal">{flight.departure1} → <mark>{flight.destination1}</mark></div>
                            </div>
                          </div>
                          <div class="columns is-data">
                            <div class="column col-6 col-sm-4 is-data">
                              <div>
                                <time>{`${flight.depTime2.slice(11, 13)}:${flight.depTime2.slice(14, 16)} - ${flight.arrTime2.slice(11, 13)}:${flight.arrTime2.slice(14, 16)}`}</time>
                              </div>
                              <div class="is-normal">{flight.airline2}</div>
                            </div>
                            <div class="column col-3 col-sm-4 is-data">
                              <div>non-stop</div>
                            </div>
                            <div class="column col-3 col-sm-4 is-data">
                              <div>
                                <time>{`${Math.floor(flight.duration2 / 60)}H ${flight.duration2 % 60}M`}</time>
                              </div>
                              <div class="is-normal">{flight.departure2} → <mark>{flight.destination2}</mark></div>
                            </div>
                          </div>
                        </div>
                        <div class="column col-3 col-xs-12 col-sm-12 is-actions">
                          <div class="columns">
                            <div class="column col-12 col-xs-6 col-sm-4 is-data is-price">
                              <a class="heading" href="#" data-toggle="trip-favorite">Add to trip <svg class="icon icon-heart"><use xlinkHref="#icon-heart"></use></svg></a>
                              <div class="h3">{flight.totalPrice} <small>DKK</small></div>
                            </div>
                            <div class="column col-12 col-xs-6 col-sm-8 is-action">
                              <div class="dropdown is-wide">
                                <div class="btn-group btn-group-block"><a class="btn btn-success">View deal</a><a class="btn btn-success dropdown-toggle" tabindex="0"><i class="icon icon-caret"></i></a>
                                  {/* <ul class="menu text-left">
                                    <li class="menu-item"><a href="#dropdowns">Slack</a></li>
                                    <li class="menu-item"><a href="#dropdowns">Hipchat</a></li>
                                    <li class="menu-item"><a href="#dropdowns">Skype</a></li>
                                  </ul> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <div class="card">
                  <div class="card-header">
                    <div class="card-title">{`${flight.departure1} → ${flight.destination1} | ${flight.departure2} → ${flight.destination2}`}</div>
                  </div>
          
                  <div class="card-body">
                    <div class="columns col-gapless">
                      <div class="column col-9 col-xs-12 col-sm-12">
                        <div class="columns">
                          <div class="column col-6 col-sm-4 is-data">
                            <div>
                              <time>{`${flight.depTime1.slice(11, 13)}:${flight.depTime1.slice(14, 16)} - ${flight.arrTime1.slice(11, 13)}:${flight.arrTime1.slice(14, 16)}`}</time>
                            </div>
                            <div class="is-normal">{flight.airline1}</div>
                          </div>
                          <div class="column col-3 col-sm-4 is-data">
                            <div>non-stop</div>
                          </div>
                          <div class="column col-3 col-sm-4 is-data">
                            <div>
                              <time>{`${Math.floor(flight.duration1 / 60)}H ${flight.duration1 % 60}M`}</time>
                            </div>
                            <div class="is-normal">{flight.departure1} → <mark>{flight.destination1}</mark></div>
                          </div>
                        </div>
                        <div class="columns is-data">
                          <div class="column col-6 col-sm-4 is-data">
                            <div>
                              <time>{`${flight.depTime2.slice(11, 13)}:${flight.depTime2.slice(14, 16)} - ${flight.arrTime2.slice(11, 13)}:${flight.arrTime2.slice(14, 16)}`}</time>
                            </div>
                            <div class="is-normal">{flight.airline2}</div>
                          </div>
                          <div class="column col-3 col-sm-4 is-data">
                            <div>non-stop</div>
                          </div>
                          <div class="column col-3 col-sm-4 is-data">
                            <div>
                              <time>{`${Math.floor(flight.duration2 / 60)}H ${flight.duration2 % 60}M`}</time>
                            </div>
                            <div class="is-normal">{flight.departure2} → <mark>{flight.destination2}</mark></div>
                          </div>
                        </div>
                      </div>
                      <div class="column col-3 col-xs-12 col-sm-12 is-actions">
                        <div class="columns">
                          <div class="column col-12 col-xs-6 col-sm-4 is-data is-price">
                            <a class="heading" href="#" data-toggle="trip-favorite">Add to trip <svg class="icon icon-heart"><use xlinkHref="#icon-heart"></use></svg></a>
                            <div class="h3">{flight.totalPrice} <small>DKK</small></div>
                          </div>
                          <div class="column col-12 col-xs-6 col-sm-8 is-action">
                            <div class="dropdown is-wide">
                              <div class="btn-group btn-group-block"><a class="btn btn-success">View deal</a><a class="btn btn-success dropdown-toggle" tabindex="0"><i class="icon icon-caret"></i></a>
                                {/* <ul class="menu text-left">
                                  <li class="menu-item"><a href="#dropdowns">Slack</a></li>
                                  <li class="menu-item"><a href="#dropdowns">Hipchat</a></li>
                                  <li class="menu-item"><a href="#dropdowns">Skype</a></li>
                                </ul> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    //If it's a one way
                    // <div id="result" key={i}>
                    //     <div id="takeoff">
                    //         <p>DEPARTURE FLIGHT</p>
                    //         {this.showFlightTimesOneWay(flight)}
                    //         <p>
                    //             {flight.airline + "  "}
                    //             {`${flight.departure} - ${flight.destination}`}
                    //         </p>
                    //     </div>
                    //     <div id="price">
                    //         {`Price: ${flight.price}`}
                    //     </div>
                    // </div>
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


