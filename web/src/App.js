import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import 'react-input-range/lib/css/index.css';
import './App.css';
import SearchParameters from './components/SearchParameters'
import LoginApp from './components/Login'
import Register from './components/Register'
import facade from "./dataFacade";




class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: false, tripType: "returntrip", account: {} }
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

  onChangeRegister = (e) => {
    const acc = this.state.account;
    acc[e.target.name] = e.target.value;
    this.setState({
      account: acc
    })
  }


  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }

  login = async (user, pass) => {
    this.setState({ user, errorMsg: "" })
    await facade.login(user, pass)
      .then(res => {
        this.setState({ loggedIn: true, username: [user] })
      })
      .catch(e => {
        e.fullError.then(e => this.setState({ errorMsg: e.errorMessage }))
      })
  }



  render() {
    return (
      <Router>
        <div>
          <Header loggedIn={this.state.loggedIn} logout={this.logout} username={this.state.username} />
          {/* <SearchParameters /> */}
          {/* <ResultContainer /> */}
          {/* <AdContainer /> */}
          <Route exact path="/" render={() => <Home state={this.state} onDataChanged={this.onDataChanged} removeArrivalDate={this.removeReturnDate} setTripType={this.setTripType} tripType={this.state.tripType} />} />
          <Route path="/login" render={() => <LoginApp state={this.state} loggedIn={this.state.loggedIn} login={this.login} logout={this.logout} user={this.state.user} onDataChanged={this.onDataChanged} />} />
          <Route path="/logout" render={() => <Logout logout={this.logout} />} />
          <Route path="/register" render={() => <Register onChangeRegister={this.onChangeRegister} account={this.state.account} login={this.login} />} />
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
        <SearchParameters state={props.state} onDataChanged={props.onDataChanged} removeArrivalDate={props.removeArrivalDate} tripType={props.tripType} setTripType={props.setTripType} />
      </div>
    </div>
  );
}

const Header = (props) => (
  <ul className="header">
    <li>
      <NavLink exact to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/persons">Persons</NavLink>
    </li>
    <li>
      <NavLink to="/login">{(props.loggedIn) ? props.username : "Login"}</NavLink>
      {(props.loggedIn) ? <NavLink to="/logout" onClick={props.logout}>Log out</NavLink> : ""}
    </li>
    {(props.loggedIn) ? "" : <li><NavLink to="/register">Register</NavLink></li>}
  </ul>
)


const Logout = (props) => (
  <Redirect to="/" />
)

export default App;