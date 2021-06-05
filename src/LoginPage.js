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
                <h2 className="acct-header">Log In</h2>
                <br/>
                <div className="error-message" id="signin-error">{this.state.error}</div>
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
                <div>New to BLOOG? <Link to="/register">Create an account</Link></div>
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