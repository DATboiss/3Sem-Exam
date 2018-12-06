import React, { Component } from 'react';
import Result from './Result'
import BeatLoader from 'react-spinners/BeatLoader'



export default class SearchParameter extends Component {
    constructor(props) {
        super(props);
        this.state = {returnColor: "#f7775a", onewayColor: "#3e99d2"};
    }




    showSearchParams() {
        return <div className="card card-search">
            <div className="card-body">
                <div className="columns col-small-gaps">
                    <div className={this.props.inputClassName}>
                        <div className="form-group">
                            <div className="form-autocomplete form-autocomplete-addon">
                                <div className="form-autocomplete-input form-input" data-toggle="autocomplete-input">
                                    <div className="has-icon-left">
                                        <input required className="form-input" type="text" placeholder="Departure city" name="departureLoc" onChange={this.props.onDataChanged}  /><i className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-airplane"></use></svg>
                                    </div>
                                    <svg className="icon icon-repeat"><use xlinkHref="#icon-repeat"></use></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.inputClassName}>
                        <div className="form-group">
                            <div className="form-autocomplete">
                                <div className="form-autocomplete-input form-input" data-toggle="autocomplete-input">
                                    <div className="has-icon-left">
                                        <input required className="form-input" type="text" placeholder="Destination city" name="arrivalLoc" onChange={this.props.onDataChanged} /><i
                                            className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-airplane-reverse"></use></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.inputClassName}>
                        <div className="form-group">
                            <div className="form-autocomplete">
                                <div className="form-autocomplete-input form-input" data-toggle="autocomplete-calendar">
                                    <div className="has-icon-left">
                                        <input required className="form-input" type="date" placeholder="From" name="dateDeparture" onChange={this.props.onDataChanged} /><i
                                            className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-calendar"></use></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(this.props.state.tripType === "returntrip") ?
                        <div className={this.props.inputClassName}>
                            <div className="form-group">
                                <div className="form-autocomplete">
                                    <div className="form-autocomplete-input form-input" data-toggle="autocomplete-calendar">
                                        <div className="has-icon-left">
                                            <input required className="form-input" type="date" placeholder="To" name="dateReturn" onChange={this.props.onDataChanged} /><i
                                                className="form-icon loading"></i><svg className="icon icon-airplane"><use xlinkHref="#icon-calendar"></use></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                    }

                    {/* <div className="column col-12 col-xs-12 col-sm-6 col-md-6 col-md-one-five">
            <div className="form-group has-icon-left">
              <select className="form-select" data-cip-id="cIPJQ342845663">
                <option value="">Choose a class</option>
                <option value="1">Economy</option>
                <option value="2">Premium Economy</option>
                <option value="3">Business and First class</option>
              </select>
              <svg className="icon icon-people"><use xlinkHref="#icon-people"></use></svg>
            </div>
          </div> */}
                    <div className="column col-6">
                        <button className="btn btn-primary btn-lg col-12" onClick={this.props.fetchFlights}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    }

    setActiveButton = (e) => {
        if(e.target.id === "oneway"){
        this.setState({
            onewayColor: "#f7775a",
            returnColor: "#3e99d2"
        }) }
        else {
            this.setState({
                onewayColor: "#3e99d2",
                returnColor: "#f7775a"
            })
        }
    }
    render() {
        return (<>
            <ShowFilterParameter
                tripType={this.props.state.tripType}
                totalPrice={this.props.state.totalPrice}
                onDataChanged={this.props.onDataChanged}
                filterList={this.props.filterList} />

            <div className="off-canvas-content">
                <div className="sp-content" id="content">
                {/* <h3 class="s-title"><span class="mr-2">One-way</span> <a href="#">Return</a></h3> */}
                <h3 className="s-title"><span style={{cursor: "pointer", color: this.state.onewayColor}} id="oneway" className="mr-2" onClick={ (e) => {this.props.setTripType(e); this.setActiveButton(e)}} >One-way</span>
                <span style={{cursor: "pointer", color: this.state.returnColor}} id="returntrip" onClick={(e) => {this.props.setTripType(e); this.setActiveButton(e)}}>Return</span></h3>

                    {/* <button className="s-title" id="oneway" onClick={this.props.setTripType}>One Way</button>
                    <button className="s-title" id="returntrip" onClick={this.props.setTripType}>Return Trip</button> */}
                    {this.showSearchParams()}

                    {
                        (this.props.resultsMounted) ? (this.props.searched) ? <BeatLoader  /> : "" : <Result state={this.props.state} onDataChanged={this.props.onDataChanged} flights={this.props.flights} sortedFlights={this.props.sortedFlights} tripType={this.props.tripType} />
                    }
                </div>
            </div>
        </>
        )
    }
}

const ShowFilterParameter = (props) => {
    return <div className="sp-sidebar off-canvas-sidebar" id="sidebar">
        <div className="sp-nav" data-simplebar="">
            {(props.tripType === "returntrip") ?
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
                                <div className="val1">500 DKK</div>
                                <div className="val2">15,000 DKK</div>
                                <input className="range-slider tooltip" name="totalPrice" type="range" min="500" max="15000" onChange={props.onDataChanged} onMouseUp={props.filterList} data-toggle="price-slider" />
                            </div>
                        </li>
                        <span>Price: {props.totalPrice}</span>
                    </ul>
                </fieldset>
                :
                <fieldset className="sp-fieldset">
                    <legend className="legend">Price</legend>
                    <ul className="menu menu-nav">
                        <li className="menu-item">
                            <div className="slider-item">
                                <div className="val1">500 DKK</div>
                                <div className="val2">15,000 DKK</div>
                                <input className="range-slider tooltip" name="price" type="range" min="500" max="15000" onChange={props.onDataChanged} onMouseUp={props.filterList} data-toggle="price-slider" />
                            </div>
                        </li>
                        <span>Price: {props.price}</span>
                    </ul>
                </fieldset>
            }
        </div>
    </div>
}