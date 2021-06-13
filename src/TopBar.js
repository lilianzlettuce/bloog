import './TopBar.css'
import { hideDrop } from './hideDrop'

import { Link, withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const TopBar = (props) => {
    function logOut() {
        props.firebase.logout()
        props.history.push('/')
    }

    function dropDown() {
        document.querySelector('#dropdown').style.display = 'flex'
    }

    return (
        <div id="topbar" onClick={(e) => hideDrop(e)}>
            <Link id="cards-icon" to="/">
                <svg width="170px" height="120px">
                    <rect className="cards-path" width="110px" height="80px" x="40" y="10" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                    <rect className="cards-path" width="110px" height="80px" x="20" y="25" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                </svg>
            </Link>
            <Link className="top-link" to="/">
                <h4><i id="home-icon" className="fas fa-home"></i> Home</h4>
            </Link>
            <Link className="top-link" to="/editor">
                <h4><i id="home-icon" className="fas fa-plus"></i> Create</h4>
            </Link>
            {props.isLoggedIn && 
                <div id="nav-prof">
                    <button id="user-icon-btn" onClick={() => dropDown()}><i id="user-icon" className="far fa-user top-link"></i></button>
                    <div id="dropdown">
                        <div className="drop-text">
                            <div id="sign-in-as">Signed in as</div>
                            <h5 id="nav-username">{props.username + " (" + props.displayName + ")"}</h5>
                        </div>
                        <Link to={"/profile/" + props.isLoggedIn} style={{width: '100%'}}><button className="drop-btn">Profile</button></Link>
                        <button className="drop-btn" onClick={() => logOut()}>Sign Out</button>
                    </div>
                </div>
            }
            {!props.isLoggedIn &&
                <div id="login-container">
                    <Link className="top-link" to="/login">
                        <h4>Log In</h4>
                    </Link>
                    <Link className="top-link" to="/register">
                        <h4>Sign Up</h4>
                    </Link>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        email: state.firebase.auth.email,
        isLoggedIn: state.firebase.auth.uid,
        username: state.firebase.profile.username,
        displayName: state.firebase.profile.displayName,
    }
}

export default compose(
    withRouter,
    firebaseConnect(),
    connect(mapStateToProps)
)(TopBar)