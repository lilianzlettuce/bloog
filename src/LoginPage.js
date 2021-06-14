import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, Redirect } from 'react-router-dom'

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
        document.querySelector('#signin-error').style.display = 'none'
        this.setState({ 
            [e.target.name]: e.target.value,
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
            document.querySelector('#signin-error').style.display = 'block'
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
                    <div className="outline-box">
                        <h2 className="acct-header">Welcome back!</h2>
                        <div className="error-message" id="signin-error">{this.state.error}</div>
                        <div className="input-container">
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
                        <button className="acct-btn" onClick={this.login}>Sign in</button>
                        <div  className="subtext">New to BLOOG? <Link className="link" to="/register">Create an account.</Link></div>
                    </div>
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
    return { isLoggedIn: state.firebase.auth.uid }
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
)(LoginPage)