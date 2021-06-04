import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import './AccountPages.css'

class RegisterPage extends React.Component {
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

    register = async () => {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }

        try {
            await this.props.firebase.createUser(credentials)
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
                <h2>Create an Account</h2>
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
                <button onClick={this.register}>Sign up</button>
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
)(RegisterPage)