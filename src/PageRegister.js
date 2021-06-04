import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'

import './PageRegister.css'

class PageRegister extends React.Component {
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
        return (
            <div>
                <h2>Create an Account</h2>
                <br/>
                <div>
                    <input 
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={this.setState.email}
                    />
                    <br/>
                    <input 
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.setState.password}
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

export default firebaseConnect()(PageRegister)