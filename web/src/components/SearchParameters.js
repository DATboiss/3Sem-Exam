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

  showSearchParams() {
    return <div className="card card-search">
      <div className="card-body">
        <div className="columns col-small-gaps">
          <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five">
            <div className="form-group">
              <div className="form-autocomplete form-autocomplete-addon">
                <div className="form-autocomplete-input form-input" data-toggle="autocomplete-input">
                  <div className="has-icon-left">
                    <input className="form-input" type="text" placeholder="Departure city" name="departureLoc" onChange={this.props.onDataChanged} /><i className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-airplane"></use></svg>
                  </div>
                  <svg className="icon icon-repeat"><use xlinkHref="#icon-repeat"></use></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five">
            <div className="form-group">
              <div className="form-autocomplete">
                <div className="form-autocomplete-input form-input" data-toggle="autocomplete-input">
                  <div className="has-icon-left">
                    <input className="form-input" type="text" placeholder="Destination city" name="arrivalLoc" onChange={this.props.onDataChanged} /><i
                      className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-airplane-reverse"></use></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five">
            <div className="form-group">
              <div className="form-autocomplete">
                <div className="form-autocomplete-input form-input" data-toggle="autocomplete-calendar">
                  <div className="has-icon-left">
                    <input className="form-input" type="date" placeholder="From" name="dateDeparture" onChange={this.props.onDataChanged} /><i
                      className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-calendar"></use></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(this.props.state.tripType === "returntrip") ?
            <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five">
              <div className="form-group">
                <div className="form-autocomplete">
                  <div className="form-autocomplete-input form-input" data-toggle="autocomplete-calendar">
                    <div className="has-icon-left">
                      <input className="form-input" type="date" placeholder="To" name="dateReturn" onChange={this.props.onDataChanged} /><i
                        className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-calendar"></use></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            ""
          }

          <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five">
            <div className="form-group has-icon-left">
              <select className="form-select" data-cip-id="cIPJQ342845663">
                <option value="">Choose a class</option>
                <option value="1">Economy</option>
                <option value="2">Premium Economy</option>
                <option value="3">Business and First class</option>
              </select>
              <svg className="icon icon-people"><use xlinkHref="#icon-people"></use></svg>
            </div>
          </div>
          <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five col-ml-auto actions-bar">
            <button className="btn btn-primary btn-lg col-12" onClick={this.fetchFlights}>Search</button>
          </div>
        </div>
      </div>
      <p>{JSON.stringify(this.props.state)}</p>
    </div>
  }

  oneWayTrip() {
    return <form onChange={this.props.onDataChanged} onSubmit={this.fetchFlights}>
      <input type="text" name="departureLoc" placeholder="Departure" />
      <input type="text" name="arrivalLoc" placeholder="Destination" />
      <input type="date" name="dateDeparture" />
      {/* <input type="text" name="passengers" /> */}
      <button>Submit</button>
      {/* <p>{JSON.stringify(this.props.state)}</p> */}
    </form>
  }

  render() {
    return (<>
        <div className="sp-sidebar off-canvas-sidebar" id="sidebar">
          <div className="sp-nav" data-simplebar="">
            {(this.props.state.tripType === "returntrip") ?
              // <form onChange={this.props.onDataChanged} onMouseUp={this.props.filterList} >
              //     <p>Price: </p>
              //     <input name="totalPrice" type="range" min="100" max="3000" step="50" />
              //     <p>{JSON.stringify(this.props.state.totalPrice)}</p>
              // </form> 
              <fieldset className="sp-fieldset">
                <legend className="legend">Price</legend>
                <ul className="menu menu-nav">
                  <li className="menu-item">
                    <div className="slider-item">
                      <div className="val1">100 GBP</div>
                      <div className="val2">15,000 GBP</div>
                      <input className="range-slider tooltip" name="totalPrice" type="range" min="100" max="15000" onChange={this.props.onDataChanged} onMouseUp={this.props.filterList} data-toggle="price-slider" />
                    </div>
                  </li>
                </ul>
              </fieldset>
              :
              <fieldset className="sp-fieldset">
                <legend className="legend">Price</legend>
                <ul className="menu menu-nav">
                  <li className="menu-item">
                    <div className="slider-item">
                      <div className="val1">100 GBP</div>
                      <div className="val2">15,000 GBP</div>
                      <input className="range-slider tooltip" name="price" type="range" min="100" max="15000" onChange={this.props.onDataChanged} onMouseUp={this.props.filterList} data-toggle="price-slider" />
                    </div>
                  </li>
                </ul>
              </fieldset>
            }
          </div>
        </div>
      <div className="off-canvas-content">
        <div className="sp-content" id="content">
          <button className="s-title" id="oneway" onClick={this.props.setTripType}>One Way</button>
          <button className="s-title" id="returntrip" onClick={this.props.setTripType}>Return Trip</button>
          {this.showSearchParams()}

          {
            (this.state.resultsMounted) ? (this.state.searched) ? <BeatLoader /> : "" : <Result state={this.props.state} onDataChanged={this.props.onDataChanged} flights={this.state.flights} tripType={this.props.tripType} />
          }
        </div>
      </div>
    </>
    )
  }
}