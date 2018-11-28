import React, { Component } from 'react';
import dataFacade from '../dataFacade';
import { HashRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';





export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    createAccount = async (e) => {
        e.preventDefault();
        this.setState({
            errorMsg: undefined
        })
        if (this.props.account.userPass === this.props.account.userPass2) {
            await dataFacade.registerAccount(this.props.account)
                .catch(e =>
                    e.fullError.then(e => this.setState({ errorMsg: e.errorMessage }))
                )
                if(!this.state.errorMsg){
                    await this.props.login(this.props.account.userName, this.props.account.userPass)
                    this.setState({registered: true})
                }
        } else {
            this.setState({
                errorMsg: "Passwords aren't matching"
            })
        }
    }

    render() {
        return (
            <>
                <form onChange={this.props.onChangeRegister} onSubmit={this.createAccount}>
                    <ul style={({ listStyle: "none" })} >
                        <li>
                            {(this.state.errorMsg) ? <p style={({ color: "red", fontSize: 22, fontWeight: "bold" })}>{this.state.errorMsg}</p> : ""}
                            <input type="text" name="userName" placeholder="username" required />
                        </li>
                        <li>
                            <input type="text" name="email" placeholder="email" required />
                        </li>
                        <li>
                            <input type="text" name="name" placeholder="name" required />
                        </li>
                        <li>
                            <input type="text" name="city" placeholder="city" required />
                        </li>
                        <li>
                            <input type="text" name="userPass" placeholder="password" required />
                        </li>
                        <li>
                            <input type="text" name="userPass2" placeholder="reenter password" required />
                        </li>
                        <li><button>Register</button></li>
                    </ul>
                    <p>{JSON.stringify(this.props.account)}</p>
                </form>
                {(this.state.registered) ? <Redirect to="/login" /> : ""}
            </>
        )
    }
}