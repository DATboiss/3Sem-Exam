import React, { Component } from "react"
import facade from "../dataFacade";


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }
  }
  login = (e) => {
    e.preventDefault();
    this.props.login(this.props.state.username, this.props.state.password);
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        {(this.props.state.errorMsg) ? <p style={({ color: "red", fontSize: 20, fontWeight: "bold" })}>{this.props.state.errorMsg}</p> : ""}
        <form onSubmit={this.login} onChange={this.props.onDataChanged} >
          <input placeholder="User Name" name="username" />
          <input placeholder="Password" name="password" type="password" />
          <button>Login</button>
        </form>
      </div>
    )
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  async componentDidMount() {
    //Instead of writing a component for each login page, we are using the username to see if the user is admin or user
    const base64URL = localStorage.getItem("jwtToken").split('.')[1];
    const base64 = base64URL.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));
    try {
      if (payload.roles.includes('admin'))
        await facade.fetchDataAdmin().then(res => this.setState({ dataFromServer: res }))
      else if (payload.roles.includes('user'))
        await facade.fetchDataUser().then(res => this.setState({ dataFromServer: res }));
    } catch (e) {
      if (e.fullError) {
        this.setState({ errorMsg: e.errorMessage })
      } else {
        this.setState({ errorMsg: "Something went wrong with the server" })
      }
    }
  }
  render() {
    return (
      <div className="profileContainer">
        <div className="profileInformation">
          {(!this.state.errorMsg) ? <h3 style={{color:"white"}}>This is your profile: {this.state.dataFromServer.username}</h3> : <h3 style={({ color: "red" })}>{this.state.errorMsg}</h3>}
          <ul style={({ listStyle: "none", textAlign: "center", color: "white" })}>
            <li><span className="profileTitle">Username: </span><span className="profileValue">{this.state.dataFromServer.username}</span> </li>
            <li><span className="profileTitle">Email: </span><span className="profileValue">{this.state.dataFromServer.email}</span></li>
            <li><span className="profileTitle">Name: </span><span className="profileValue">{this.state.dataFromServer.name}</span></li>
            <li><span className="profileTitle">City: </span><span className="profileValue">{this.state.dataFromServer.city}</span></li>
          </ul>
        </div>
      </div>
    )
  }
}
class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div>
        {!this.props.state.loggedIn ? (<LogIn login={this.props.login} onDataChanged={this.props.onDataChanged} state={this.props.state} />) :
          (<div>
            <LoggedIn user={this.props.state.user} errorMsg={this.props.errorMsg} />
          </div>)}
      </div>
    )
  }
}
export default LoginApp;
