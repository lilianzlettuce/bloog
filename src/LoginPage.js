import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import './AccountPages.css'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }

    //for inputs
    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value,
            error: '',
        })
    }

    login = async () => {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }

        try {
            await this.props.firebase.login(credentials)
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="acct-container">
                <h2>Log In</h2>
                <br/>
                <div>
                    <input 
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    <br/>
                    <input 
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                </div>
                <br/>
                <button onClick={this.login}>Log in</button>
                <br/>
                <div className="error-message" id="signup-error">{this.state.error}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { isLoggedIn: state.firebase.auth.uid }
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
)(LoginPage)