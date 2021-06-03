import React from 'react'

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

    render() {
        return (
            <div>
                <h2>Register</h2>
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
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.setState.password}
                    />
                </div>
            </div>
        )
    }
}

export default PageRegister