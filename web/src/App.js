import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import 'react-input-range/lib/css/index.css';
import './App.css';
import SearchParameters from './components/SearchParameters'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {tripType: "returntrip"}
  }

  onDataChanged = (e) => {
    if (e)
      this.setState({ [e.target.name]: e.target.value })
  }
  removeReturnDate = () => {
    this.setState({ dateReturn: undefined });
  }
  
  setTripType = (e) => {
    if (e.target.id === "oneway") {
      this.removeReturnDate();
    }
    this.setState({ tripType: e.target.id })
  }



  render() {
    return (
      <Router>
        <div>
          {/* <Header /> */}
          {/* <SearchParameters /> */}
          {/* <ResultContainer /> */}
          {/* <AdContainer /> */}
          <Route exact path="/" render={() => <Home state={this.state} onDataChanged={this.onDataChanged} removeArrivalDate={this.removeReturnDate} setTripType={this.setTripType} tripType={this.state.tripType}/>} />
        </div>
      </Router>
    )
  }
}

const Home = (props) => {
  return (
    <div>
      <div>
        <h2>DatFlights</h2>
      </div>
      <div>
        <SearchParameters state={props.state} onDataChanged={props.onDataChanged} removeArrivalDate={props.removeArrivalDate} tripType={props.tripType} setTripType={props.setTripType}/>
      </div>
    </div>
  );
}

const Header = () => (
  <ul className="header">
    <li>
      <NavLink exact to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/persons">Persons</NavLink>
    </li>
    <li>
      <NavLink to="/login">Login</NavLink>
    </li>

  </ul>
)


export default App;