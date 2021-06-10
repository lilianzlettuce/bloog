import './TopBar.css'

import { Link, withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const TopBar = (props) => {
    function logOut() {
        props.firebase.logout()
        props.history.push('/')
    }

    const accountStuff = () => {
        if (props.isLoggedIn) {
            return (
                <div>
                    <h5>{props.username}</h5>
                    <button className="" onClick={() => logOut()}>Sign Out</button>
                </div>
            )
        } else {
            return (
                <div id="login-container">
                    <Link className="top-link" to="/login">
                        <h4>Log In</h4>
                    </Link>
                    <Link className="top-link" to="/register">
                        <h4>Sign Up</h4>
                    </Link>
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
    return { 
        email: state.firebase.auth.email,
        isLoggedIn: state.firebase.auth.uid,
        username: state.firebase.profile.username
    }
}

export default compose(
    withRouter,
    firebaseConnect(),
    connect(mapStateToProps)
)(TopBar)