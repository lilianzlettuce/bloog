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
        document.querySelector('#signup-error').style.display = 'none'
        this.setState({ 
            [e.target.name]: e.target.value,
        })
    }

    register = async () => {
        if (!this.state.username.trim()) {
            this.setState({ error: 'Fill in all fields to create user.' })
            document.querySelector('#signup-error').style.display = 'block'
            return
        }

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
            document.querySelector('#signup-error').style.display = 'block'
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="acct-container">
                <Link className="back-btn" to="/">Back to home</Link>
                <div className="acct-child1">
                    <h2 className="acct-header">Create your Account</h2>
                    <br/>
                    <div className="error-message" id="signup-error">{this.state.error}</div>
                    <br/>
                    <div className="input-container">
                        <input 
                            className="acct-input"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <br/>
                        <input 
                            className="acct-input"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <br/>
                        <input 
                            className="acct-input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <br/>
                    <button className="acct-btn" onClick={this.register}>Create account</button>
                    <br/>
                    <div>Already have an account? <Link to="/login">Sign in.</Link></div>
                </div>
                <svg width="170px" height="120px">
                    <rect className="acct-path" width="110px" height="80px" x="40" y="10" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                    <rect className="acct-path" width="110px" height="80px" x="20" y="25" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                </svg>
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