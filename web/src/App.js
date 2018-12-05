import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
// import 'react-input-range/lib/css/index.css';
// import './App.css';
import './css/main.min.css';
import './css/vendor.min.css';
import './css/simplebar.css'
import SearchParameters from './components/SearchParameters'
import Filter from './components/Filter'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { tripType: "returntrip" }
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

      <div className="sp-container off-canvas off-canvas-sidebar-show container">
        <div className="sp-navbar">
          <div className="container">
            <header className="navbar">
              <section className="navbar-section">
                <a className="off-canvas-toggle btn btn-link btn-action" href="#sidebar" data-toggle="off-canvas-toggle"><i
                  className="icon icon-menu"></i></a>

                <div className="sp-brand">
                  <a className="sp-logo" href="../index.html">
                    <img src="img/logo.svg" alt="Spectre.css CSS Framework" /></a>
                </div>
              </section>
              <section className="navbar-center hide-sm">
                <a href="..." className="btn btn-link">Lorem Ipsum</a>
                <a href="..." className="btn btn-link">Dolor Light</a>
                <a href="..." className="btn btn-link">Dolor Ipsum</a>
                <a href="..." className="btn btn-link">Dolor Light</a>
              </section>
              <section className="navbar-section">
                <a className="btn btn-outline-primary col-ml-auto" href="#modal-id">
                  <svg className="icon icon-log-in"><use xlinkHref="#icon-log-in"></use></svg> Login
          </a>
              </section>
            </header>
          </div>
        </div>

        <Router>
          {/* <Header /> */}
          {/* <SearchParameters /> */}
          {/* <ResultContainer /> */}
          {/* <AdContainer /> */}
          <Route exact path="/" render={() => <Home state={this.state} onDataChanged={this.onDataChanged} removeArrivalDate={this.removeReturnDate} setTripType={this.setTripType} tripType={this.state.tripType} />} />
        </Router>
        <script src="js/main.js"></script>
      </div>
    )
  }
}

const Home = (props) => {
  return (
    <>

      <SearchParameters state={props.state} onDataChanged={props.onDataChanged} removeArrivalDate={props.removeArrivalDate} tripType={props.tripType} setTripType={props.setTripType} />
    </>
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