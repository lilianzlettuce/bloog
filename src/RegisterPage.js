import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, Redirect } from 'react-router-dom'

import './AccountPages.css'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
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

        const profile = {
            email: this.state.email,
            username: this.state.username,
        }

        try {
            await this.props.firebase.createUser(credentials, profile)
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
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        value={this.state.username}
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
                <button disabled={!this.state.username.trim()} onClick={this.register}>Sign up</button>
                <br/>
                <div className="error-message" id="signup-error">{this.state.error}</div>
                <br/>
                <div>Already have an account? <Link to="/login">Sign in</Link></div>
                <Link to="/">Back to home</Link>
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