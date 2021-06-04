import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'

class PageRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    //for inputs
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    register = () => {

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
            </div>
        )
    }
}

export default firebaseConnect()(PageRegister)