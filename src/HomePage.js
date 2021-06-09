import './HomePage.css'

import TopBar from './TopBar'

import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class HomePage extends React.Component {

    componentDidUpdate() {
        console.log(this.props.uid)
        console.log(this.props.saved)
        if (this.props.uid && this.props.saved && !Object.keys(this.props.saved).includes(this.props.uid)) {
            this.props.firebase.database()
                .ref()
                .child('saved')
                .child(this.props.uid).set({
                0: '',
            })
        }
    }

    render() {
        if (!isLoaded(this.props.homepage)) {
            return <div>Loading...</div>
        }
    
        const myDecks = Object.keys(this.props.homepage).map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
    
            if (this.props.homepage[key].owner.username === this.props.username) {
                return (
                    <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                        <div>
                            <h3>{this.props.homepage[key].name}</h3>
                            <div className={visibility}>{visibility}</div>
                        </div>
                        <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>
                    </Link>
                )
            }
            return (
                <div key={key}></div>
            )
        })
    
        const savedDecks = Object.keys(this.props.homepage).map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
            console.log(this.props.saved)
    
            if (this.props.uid && this.props.saved && (this.props.homepage[key].public || this.props.homepage[key].owner.username === this.props.username) && this.props.saved[this.props.uid] && this.props.saved[this.props.uid].includes(key)) {
                return (
                    <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                        <div>
                            <h3>{this.props.homepage[key].name}</h3>
                            {(this.props.homepage[key].owner.username === this.props.username) && <div className={visibility}>{visibility}</div>}
                        </div>
                        {(this.props.homepage[key].owner.username !== this.props.username) && <h4 className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>}
                        {(this.props.homepage[key].owner.username === this.props.username) && <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>}
                    </Link>
                )
            }
            return (
                <div key={key}></div>
            )
        })
    
        const publicDecks = Object.keys(this.props.homepage).map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
    
            if (this.props.homepage[key].public) {
                return (
                    <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                        <div>
                            <h3>{this.props.homepage[key].name}</h3>
                            {(this.props.homepage[key].owner.username === this.props.username) && <div className={visibility}>{visibility}</div>}
                        </div>
                        {(this.props.homepage[key].owner.username !== this.props.username) && <h4 className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>}
                        {(this.props.homepage[key].owner.username === this.props.username) && <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>}
                    </Link>
                )
            }
            return (
                <div key={key}></div>
            )
        })
    
        return (
            <div id="main">
                <TopBar />
                {(this.props.username) &&
                    <div>
                        <div className="section">
                            <h2>My Decks</h2>
                            <div className="deck-section">{myDecks}</div>
                        </div>
                        <div className="section">
                            <h2>Saved Decks</h2>
                            <div className="deck-section">{savedDecks}</div>
                        </div>
                    </div>
                }
                <div className="section">
                    <h2>Public Decks</h2>
                    <div className="deck-section">{publicDecks}</div>
                </div>
            </div>
        )
    }
}

const populates = [
    { child: 'owner', root: 'users' }
]

const mapStateToProps = state => {
    const uid = state.firebase.auth.uid
    return { 
        homepage: populate(state.firebase, 'homepage', populates),
        username: state.firebase.profile.username,
        uid: uid,
        saved: populate(state.firebase, `saved`, populates),
    }
}

export default compose(
    firebaseConnect([
        { path: '/homepage', populates },
        { path: '/saved', populates },
    ]),
    connect(mapStateToProps),
)(HomePage)