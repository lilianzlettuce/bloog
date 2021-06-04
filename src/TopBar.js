import './TopBar.css'

import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const TopBar = (props) => {
    const accountStuff = () => {
        if (!isLoaded(props.email)) {
            return (
                <div id="login-container">
                    <Link className="top-link" to="/LoginPage">
                        <h4>Log In</h4>
                    </Link>
                    <Link className="top-link" to="/RegisterPage">
                        <h4>Sign Up</h4>
                    </Link>
                </div>
            )
        } else {
            return (
                <div>
                    <h5>{props.email}</h5>
                    <button className="" onClick={() => props.firebase.logout()}>Sign Out</button>
                </div>
            )
        }
    }

    return (
        <div id="topbar">
            <Link id="cards-icon" to="/">
                <svg width="170px" height="120px">
                    <rect className="cards-path" width="110px" height="80px" x="40" y="10" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                    <rect className="cards-path" width="110px" height="80px" x="20" y="25" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                </svg>
            </Link>
            <Link className="top-link" to="/">
                <h4>Home</h4>
            </Link>
            <Link className="top-link" to="/editor">
                <h4>Create</h4>
            </Link>
            <div>
                {accountStuff()}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { email: state.firebase.auth.email }
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(TopBar)