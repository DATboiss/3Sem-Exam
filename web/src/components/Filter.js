import React, { Component } from 'react'


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            (this.props.tripType === "returntrip") ?
                <form onChange={this.props.onDataChanged} onMouseUp={this.props.filterList} >
                    <p>Price: </p>
                    <input name="totalPrice" type="range" min="100" max="3000" step="50" />
                    <p>{JSON.stringify(this.props.state.totalPrice)}</p>
                </form> :
                <form onChange={this.props.onDataChanged} onMouseUp={this.props.filterList} step="50" >
                    <p>Price: </p>
                    <input name="price" type="range" min="100" max="3000" />
                    <p>{JSON.stringify(this.props.state.price)}</p>
                </form>
        )
    }
}