import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
// import 'react-input-range/lib/css/index.css';
// import './App.css';
import './css/main.min.css';
import './css/vendor.min.css';
import './css/simplebar.css'
import SearchParameters from './components/SearchParameters'
import logo from './img/logo.svg'


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
      <>
        <svg aria-hidden="true" style={{position: "absolute", width: 0, height: 0, overflow: "hidden"}} version="1.1" xmlns="http://www.w3.org/2000/svg"  xlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="icon-chevron-bottom" viewBox="0 0 16 16">
            <title>chevron-bottom</title>
            <path d="M3 2l-3 3 8 8 8-8-3-3-5 5-5-5z"></path>
          </symbol>
          <symbol id="icon-globe" viewBox="0 0 16 16">
            <title>globe</title>
            <path d="M8 0c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM8 2c0.66 0 1.28 0.18 1.88 0.38-0.42 0.4-0.9 0.76-0.82 1.12s1.38 0.26 1.38 1c0 0.54-0.84 0.7-0.26 1.32 0.7 0.7-1.28 1.96-1.32 2.88-0.060 1.66 1.68 1.94 3.060 1.94 0.84 0 1.060 0.4 1 0.88-1.080 1.54-2.92 2.5-4.94 2.5-0.76 0-1.46-0.18-2.12-0.44 0.44-0.88-0.56-2.62-1.5-3.18-0.46-0.46-1.44-0.28-2-0.5-0.18-0.54-0.36-1.080-0.38-1.68 0.060-0.1 0.16-0.18 0.32-0.18 0.38 0 0.9 0.76 1.18 0.68 0.36-0.080-1.48-2.62-0.62-3.12 0.4-0.24 1.2 0.78 0.94-0.32-0.24-1.020 0.72-0.56 1.32-0.82 0.52-0.22 0.9-0.82 0.26-1.18-0.12-0.060-0.26-0.2-0.44-0.38 0.9-0.54 1.94-0.88 3.060-0.88zM12.62 4.18c0.36 0.44 0.64 0.92 0.88 1.44 0 0.020 0 0.040 0 0.060-0.080 0.14-0.22 0.22-0.44 0.44-0.56 0.56-0.64-0.42-0.88-0.62-0.26-0.24-1.2 0.040-1.32-0.26-0.14-0.36 1-0.84 1.76-1.060z"></path>
          </symbol>
          <symbol id="icon-people" viewBox="0 0 20 16">
            <title>people</title>
            <path d="M13.538 0c-1.255 0-2.338 0.649-3.003 1.632 1.108 1.001 1.772 2.374 1.772 3.95 0 0.538-0.074 1.020-0.222 1.502 0.468 0.204 0.935 0.352 1.452 0.352 2.043 0 3.692-1.669 3.692-3.709s-1.649-3.709-3.692-3.709v-0.019zM6.154 1.854c-2.043 0-3.692 1.669-3.692 3.709s1.649 3.709 3.692 3.709c2.043 0 3.692-1.669 3.692-3.709s-1.649-3.709-3.692-3.709zM17.846 7.714c-1.058 0.946-2.511 1.521-4.16 1.558 0.665 0.705 1.083 1.558 1.083 2.485v1.224h4.923v-3.078c0-0.964-0.763-1.799-1.846-2.207v0.019zM1.846 9.569c-1.083 0.408-1.846 1.242-1.846 2.207v3.078h12.308v-3.078c0-0.964-0.763-1.799-1.846-2.207-1.108 0.983-2.609 1.558-4.308 1.558s-3.2-0.593-4.308-1.558z"></path>
          </symbol>
          <symbol id="icon-airplane-reverse" viewBox="0 0 19 16">
            <title>airplane-reverse</title>
            <path d="M3.092 6.609c0.145 0 0.633 0.004 0.77 0.013l2.775 0.074c0.030 0 0.060-0.013 0.073-0.039l4.161-6.335c0.124-0.2 0.346-0.322 0.577-0.322h1.013c0.239 0 0.321 0.243 0.235 0.47l-2.142 6.209c-0.021 0.057 0.017 0.117 0.077 0.117l5.234 0.078c0.111 0.004 0.214-0.048 0.282-0.135l1.582-1.957c0.128-0.17 0.329-0.265 0.539-0.265h0.718c0.12 0 0.201 0.117 0.163 0.23l-0.851 2.987c-0.064 0.165-0.064 0.352 0 0.517l0.851 2.987c0.038 0.113-0.043 0.23-0.163 0.23h-0.714c-0.21 0-0.411-0.1-0.539-0.265l-1.612-1.987c-0.068-0.087-0.175-0.139-0.282-0.135l-5.204 0.117c-0.060 0.004-0.098 0.061-0.077 0.117l2.142 6.213c0.086 0.226 0.004 0.47-0.235 0.47h-1.013c-0.235 0-0.453-0.122-0.577-0.322l-4.165-6.33c-0.017-0.026-0.043-0.039-0.073-0.039l-2.775 0.074c-0.141 0.009-0.624 0.013-0.77 0.013-1.894 0-3.092-0.622-3.092-1.391s1.193-1.396 3.092-1.396z"></path>
          </symbol>
          <symbol id="icon-airplane" viewBox="0 0 16 16">
            <title>airplane</title>
            <path d="M13.424 6.841c-0.121 0-0.527 0.004-0.641 0.011l-2.313 0.062c-0.025 0-0.050-0.011-0.061-0.033l-3.467-5.279c-0.103-0.167-0.289-0.268-0.481-0.268h-0.845c-0.2 0-0.267 0.203-0.196 0.391l1.785 5.174c0.018 0.047-0.014 0.098-0.064 0.098l-4.362 0.065c-0.093 0.004-0.178-0.040-0.235-0.112l-1.318-1.63c-0.107-0.141-0.274-0.221-0.449-0.221h-0.599c-0.1 0-0.167 0.098-0.135 0.192l0.709 2.489c0.053 0.138 0.053 0.293 0 0.431l-0.709 2.489c-0.032 0.094 0.036 0.192 0.135 0.192h0.595c0.175 0 0.342-0.083 0.449-0.221l1.343-1.656c0.057-0.072 0.146-0.116 0.235-0.112l4.337 0.098c0.050 0.004 0.082 0.051 0.064 0.098l-1.785 5.178c-0.071 0.188-0.004 0.391 0.196 0.391h0.845c0.196 0 0.378-0.101 0.481-0.268l3.471-5.275c0.014-0.022 0.036-0.033 0.061-0.033l2.313 0.062c0.118 0.007 0.52 0.011 0.641 0.011 1.579 0 2.576-0.518 2.576-1.159s-0.994-1.163-2.576-1.163z"></path>
          </symbol>
          <symbol id="icon-calendar" viewBox="0 0 16 16">
            <title>calendar</title>
            <path d="M12.643 8.667h-3.979v4h3.979v-4zM11.316 0v1.333h-6.632v-1.333h-1.99v1.333h-0.995c-0.912 0-1.658 0.75-1.658 1.667v11.333c0 0.917 0.746 1.667 1.658 1.667h12.601c0.912 0 1.658-0.75 1.658-1.667v-11.333c0-0.917-0.746-1.667-1.658-1.667h-0.995v-1.333h-1.99zM14.301 14.333h-12.601v-8.833h12.601v8.833z"></path>
          </symbol>
          <symbol id="icon-repeat" viewBox="0 0 16 16">
            <title>repeat</title>
            <path d="M3.896 4h8.204v2.4l3.281-3.2-3.277-3.2v2.4h-9.846v4.8h1.642v-3.2h-0.004zM12.104 12h-8.208v-2.4l-3.281 3.2 3.281 3.2v-2.4h9.846v-4.8h-1.642v3.2h0.004z"></path>
          </symbol>
          <symbol id="icon-card" viewBox="0 0 16 16">
            <title>card</title>
            <path d="M14.4 1.667h-12.8c-0.889 0-1.593 0.705-1.593 1.583l-0.007 9.5c0 0.878 0.711 1.583 1.6 1.583h12.8c0.889 0 1.6-0.705 1.6-1.583v-9.5c0-0.878-0.711-1.583-1.6-1.583zM14.4 12.75h-12.8v-4.75h12.8v4.75zM14.4 4.833h-12.8v-1.583h12.8v1.583z"></path>
          </symbol>
          <symbol id="icon-heart-empty" viewBox="0 0 16 16">
            <title>heart-empty</title>
            <path d="M11.6 0.667c-1.4 0-2.719 0.638-3.6 1.677-0.881-1.039-2.2-1.677-3.6-1.677-2.481 0-4.4 1.917-4.4 4.396 0 3.036 2.719 5.473 6.838 9.232l1.162 1.039 1.162-1.039c4.119-3.758 6.838-6.195 6.838-9.232 0-2.479-1.919-4.396-4.4-4.396zM8.492 13.244l-0.162 0.149-0.331 0.298-0.331-0.298-0.162-0.149c-1.938-1.768-3.615-3.296-4.719-4.66-1.077-1.325-1.554-2.41-1.554-3.522 0-0.875 0.323-1.677 0.912-2.265 0.585-0.588 1.385-0.909 2.254-0.909 1.004 0 2 0.466 2.658 1.241l0.942 1.111 0.942-1.111c0.658-0.779 1.654-1.241 2.658-1.241 0.869 0 1.669 0.321 2.258 0.909s0.912 1.394 0.912 2.265c0 1.108-0.481 2.196-1.554 3.522-1.108 1.364-2.781 2.891-4.723 4.66z"></path>
          </symbol>
          <symbol id="icon-heart" viewBox="0 0 16 16">
            <title>heart</title>
            <path d="M8 15.333l-1.16-1.039c-4.12-3.756-6.84-6.194-6.84-9.231 0-2.478 1.92-4.396 4.4-4.396 1.4 0 2.72 0.639 3.6 1.679 0.88-1.039 2.2-1.679 3.6-1.679 2.48 0 4.4 1.918 4.4 4.396 0 3.037-2.72 5.475-6.84 9.231l-1.16 1.039z"></path>
          </symbol>
          <symbol id="icon-heart-2" viewBox="0 0 16 16">
            <title>heart-2</title>
            <path d="M8 15.333l-1.16-1.039c-4.12-3.756-6.84-6.194-6.84-9.231 0-2.478 1.92-4.396 4.4-4.396 1.4 0 2.72 0.639 3.6 1.679 0.88-1.039 2.2-1.679 3.6-1.679 2.48 0 4.4 1.918 4.4 4.396 0 3.037-2.72 5.475-6.84 9.231l-1.16 1.039z"></path>
          </symbol>
          <symbol id="icon-log-in" viewBox="0 0 16 16">
            <title>log-in</title>
            <path d="M8 0c-1.65 0-3.238 0.5-4.585 1.442-1.315 0.923-2.315 2.2-2.888 3.696l-0.142 0.4h1.758l0.073-0.192c0.315-0.685 0.746-1.304 1.288-1.846 1.2-1.2 2.796-1.862 4.496-1.862s3.296 0.662 4.496 1.862c1.2 1.2 1.862 2.796 1.862 4.496 0 1.696-0.662 3.296-1.862 4.496s-2.796 1.862-4.496 1.862c-1.696 0-3.292-0.662-4.496-1.862-0.538-0.538-0.973-1.158-1.288-1.842l-0.073-0.192h-1.758l0.138 0.4c0.573 1.496 1.573 2.773 2.888 3.696 1.35 0.95 2.935 1.446 4.588 1.446 4.412 0 8-3.588 8-8s-3.588-8-8-8z"></path>
            <path d="M0 8.823h7.296l-1.677 1.719 1.15 1.15 3.692-3.692-3.692-3.692-1.192 1.15 1.719 1.719h-7.296v1.646z"></path>
          </symbol>
          <symbol id="icon-settings" viewBox="0 0 16 16">
            <title>settings</title>
            <path d="M14.047 8.8c0.041-0.24 0.041-0.52 0.041-0.8s-0.041-0.52-0.041-0.8l1.71-1.32c0.163-0.12 0.204-0.32 0.082-0.52l-1.629-2.76c-0.082-0.16-0.326-0.24-0.489-0.16l-2.036 0.8c-0.407-0.32-0.895-0.6-1.384-0.8l-0.285-2.12c-0.041-0.16-0.204-0.32-0.407-0.32h-3.257c-0.204 0-0.367 0.16-0.407 0.32l-0.326 2.12c-0.489 0.2-0.936 0.48-1.385 0.8l-2.036-0.8c-0.204-0.080-0.407 0-0.489 0.16l-1.629 2.76c-0.081 0.16-0.041 0.4 0.082 0.52l1.751 1.32c0 0.28-0.041 0.52-0.041 0.8s0.041 0.52 0.041 0.8l-1.71 1.32c-0.163 0.12-0.204 0.32-0.082 0.52l1.629 2.76c0.082 0.16 0.326 0.24 0.489 0.16l2.036-0.8c0.407 0.32 0.895 0.6 1.384 0.8l0.326 2.12c0.041 0.2 0.204 0.32 0.407 0.32h3.257c0.204 0 0.367-0.16 0.407-0.32l0.326-2.12c0.488-0.2 0.936-0.48 1.384-0.8l2.036 0.8c0.204 0.080 0.407 0 0.489-0.16l1.629-2.76c0.081-0.16 0.041-0.4-0.082-0.52l-1.791-1.32zM7.98 10.8c-1.588 0-2.85-1.24-2.85-2.8s1.262-2.8 2.85-2.8c1.588 0 2.85 1.24 2.85 2.8s-1.262 2.8-2.85 2.8z"></path>
          </symbol>
          <symbol id="icon-apps" viewBox="0 0 16 16">
            <title>apps</title>
            <path d="M0 4h4v-4h-4v4zM6 16h4v-4h-4v4zM0 16h4v-4h-4v4zM0 10h4v-4h-4v4zM6 10h4v-4h-4v4zM12 0v4h4v-4h-4zM6 4h4v-4h-4v4zM12 10h4v-4h-4v4zM12 16h4v-4h-4v4z"></path>
          </symbol>
          <symbol id="icon-build" viewBox="0 0 16 16">
            <title>build</title>
            <path d="M15.755 13.049l-6.578-6.635c0.651-1.675 0.288-3.645-1.084-5.028-1.447-1.457-3.616-1.75-5.351-0.948l3.108 3.136-2.169 2.188-3.182-3.136c-0.864 1.746-0.501 3.934 0.942 5.392 1.372 1.386 3.324 1.75 4.988 1.094l6.578 6.635c0.288 0.292 0.722 0.292 1.013 0l1.664-1.675c0.363-0.296 0.363-0.805 0.071-1.023z"></path>
          </symbol>
          <symbol id="icon-checkmark-circle-outline" viewBox="0 0 16 16">
            <title>checkmark-circle-outline</title>
            <path d="M4.72 6.48l-1.12 1.12 3.6 3.6 8-8-1.12-1.12-6.88 6.84-2.48-2.44zM14.4 8c0 3.52-2.88 6.4-6.4 6.4s-6.4-2.88-6.4-6.4c0-3.52 2.88-6.4 6.4-6.4 0.6 0 1.2 0.080 1.76 0.24l1.24-1.24c-0.92-0.4-1.92-0.6-3-0.6-4.4 0-8 3.6-8 8s3.6 8 8 8c4.4 0 8-3.6 8-8h-1.6z"></path>
          </symbol>
          <symbol id="icon-checkmark" viewBox="0 0 16 16">
            <title>checkmark</title>
            <path fill="#7ed321" style={{fill: "var(--color1, #7ed321)" }}d="M5.096 11.448l-3.763-3.716-1.333 1.254 5.096 5.015 10.904-10.746-1.333-1.254z"></path>
          </symbol>
          <symbol id="icon-close-circle-outline" viewBox="0 0 16 16">
            <title>close-circle-outline</title>
            <path d="M8 1.615c1.704 0 3.308 0.665 4.515 1.869 1.204 1.208 1.869 2.812 1.869 4.515s-0.665 3.308-1.869 4.515c-1.208 1.204-2.812 1.869-4.515 1.869s-3.308-0.665-4.515-1.869c-1.204-1.208-1.869-2.812-1.869-4.515s0.665-3.308 1.869-4.515c1.208-1.204 2.812-1.869 4.515-1.869zM8 0c-4.419 0-8 3.581-8 8s3.581 8 8 8c4.419 0 8-3.581 8-8s-3.581-8-8-8z"></path>
            <path d="M12 10.881l-1.119 1.119-2.881-2.881-2.881 2.881-1.119-1.119 2.881-2.881-2.881-2.881 1.119-1.119 2.881 2.881 2.881-2.881 1.119 1.119-2.881 2.881z"></path>
          </symbol>
        </defs>
      </svg>
      <div className="sp-container off-canvas off-canvas-sidebar-show container">
        <div className="sp-navbar">
          <div className="container">
            <header className="navbar">
              <section className="navbar-section">
                <a className="off-canvas-toggle btn btn-link btn-action" href="#sidebar" data-toggle="off-canvas-toggle"><i
                  className="icon icon-menu"></i></a>

                <div className="sp-brand">
                  <a className="sp-logo" href="../index.html">
                    <img src={logo} alt="Spectre.css CSS Framework" /></a>
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
        </>
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