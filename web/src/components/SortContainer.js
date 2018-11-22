import React, { Component } from 'react'


export default class SortContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
                <form onChange={this.props.onDataChanged} onMouseUp={this.props.filterList} >
                    <p>Price: </p>
                    <input name="price" type="range" min="100" max="10000" />
                    <p>{JSON.stringify(this.props.state.price)}</p>
                </form>
        )
    }
}