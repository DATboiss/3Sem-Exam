import React, {Component} from 'react';


export default class SearchParameter extends Component {

    searchFlight = () => {
        //Todo fetch flights
    }

    render () {
        console.log(this.props)
        return (
            <div>
            <form onChange={this.props.onDataChanged}>
                <input type="text" name="departureLoc" />
                <input type="text" name="arrivalLoc" />
                <input type="date" name="dateDeparture" />
                <input type="date" name="dateArrival" />
                <input type="text" name="passengers"/>
                <button>Submit</button>
            </form>
            <p>{JSON.stringify(this.props.state)}</p>
            </div>
        )
    }
}