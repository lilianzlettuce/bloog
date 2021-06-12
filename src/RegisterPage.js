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
            name: '',
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
        const un = this.state.username.trim()

        //username input is empty
        if (!un) {
            this.setState({ error: 'Fill in all fields to create user.' })
            document.querySelector('#signup-error').style.display = 'block'
            return
        }

        //check if username is taken
        const uns = this.props.usernames
        for (let i = 0; i < uns.length; i++) {
            if (uns[i] === un) {
                this.setState({ error: 'Username unavailable.' })
                document.querySelector('#signup-error').style.display = 'block'
                return
            }
        }

        //create user
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }

        const profile = {
            email: this.state.email,
            username: un,
            displayName: this.state.name,
        }

        try {
            await this.props.firebase.createUser(credentials, profile)
        } catch (error) {
            this.setState({ error: error.message })
            document.querySelector('#signup-error').style.display = 'block'
        }

        //add username
        let newUns = this.props.usernames.slice().concat(un)
        const updates = { 
            '/usernames': newUns,
        }
        this.props.firebase.update('/', updates)
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="acct-container">
                <Link className="back-btn" to="/">Back to home</Link>
                <div className="acct-child1">
                    <h2 className="acct-header">Sign up</h2>
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
                    <br/>
                    <div className="subtext">Already have an account? <Link className="link" to="/login">Sign in.</Link></div>
                </div>
                <div className="acct-child2">
                    <div className="cards-container">
                        <div className="acct-card" id="path1"></div>
                        <div className="acct-card" id="path2">BLOOG</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        isLoggedIn: state.firebase.auth.uid,
        usernames: state.firebase.data.usernames,
    }
}

export default compose(
    firebaseConnect(['/usernames']),
    connect(mapStateToProps),
)(RegisterPage)