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
          <input placeholder="Password" name="password" />
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
  componentDidMount() {
    //Instead of writing a component for each login page, we are using the username to see if the user is admin or user
    const base64URL = localStorage.getItem("jwtToken").split('.')[1];
    const base64 = base64URL.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));
    if (payload.roles.includes('admin'))
      facade.fetchDataAdmin().then(res => this.setState({ dataFromServer: res }));
    else if (payload.roles.includes('user'))
      facade.fetchDataUser().then(res => this.setState({ dataFromServer: res }));

  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
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
            <LoggedIn user={this.props.state.user} />
            <button onClick={this.props.logout}>Logout</button>
          </div>)}
      </div>
    )
  }
}
export default LoginApp;
