import React, { Component } from 'react';
import dataFacade from '../dataFacade';
import { HashRouter as Redirect } from 'react-router-dom';





export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateFormInput = (e) => {
        e.preventDefault();
        this.setState({ errorMsg: undefined })
        //email must contain 1 @, then a 3-10 character word & end with a dot & 2-3 character word.
        const emailValidation = /(@{1})\w{3,10}\.\w{2,5}$/gm

        if (!this.state.email.match(emailValidation)) {
            this.setState({ errorMsg: "You must enter a valid email" })
        }
        else if (this.state.userPass !== this.state.userPass2) {
            this.setState({ errorMsg: "Passwords aren't matching" })
        }
        else {
            this.createAccount();
        }
    }

    createAccount = async () => {
        await dataFacade.registerAccount(this.state)
            .catch(e => {
                if (e.fullError) {
                    e.fullError.then(e => this.setState({ errorMsg: e.errorMessage }))
                }
                else {
                    this.setState({ errorMsg: "Something went wrong with the server" })
                }
            })
        if (!this.state.errorMsg) {
            await this.props.login(this.state.username, this.state.userPass)
            this.setState({ registered: true })
        }
    }

    render() {
        return (
            <>
                <form onChange={this.onChange} onSubmit={this.validateFormInput}>
                    <ul style={({ listStyle: "none" })} >
                        <li>
                            {(this.state.errorMsg) ? <p style={({ color: "red", fontSize: 22, fontWeight: "bold" })}>{this.state.errorMsg}</p> : ""}
                            <input type="text" name="username" placeholder="username" required />
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
                            <input type="password" name="userPass" placeholder="password" required />
                        </li>
                        <li>
                            <input type="password" name="userPass2" placeholder="reenter password" required />
                        </li>
                        <li><button>Register</button></li>
                    </ul>
                    <p>{JSON.stringify(this.state)}</p>
                </form>
                {(this.state.registered) ? <Redirect to="/login" /> : ""}
            </>
        )
    }
}