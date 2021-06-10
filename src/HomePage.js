import './HomePage.css'

import TopBar from './TopBar'
import Card from './Card'

import React from 'react'
import { firebaseConnect, isLoaded, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class HomePage extends React.Component {
    componentDidUpdate() {
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
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.homepage[key].owner.username}
                        user={this.props.username}
                        set="1"
                    />
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
    
            if (this.props.uid && this.props.saved && (this.props.homepage[key].public || this.props.homepage[key].owner.username === this.props.username) && this.props.saved[this.props.uid] && this.props.saved[this.props.uid].includes(key)) {
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.homepage[key].owner.username}
                        user={this.props.username}
                        set="2"
                    />
                )
            }
            return (
                <div key={key}></div>
            )
        })
    
        const publicDecks = Object.keys(this.props.homepage).map((key) => {
            if (this.props.homepage[key].public) {
                return (
                    <Card key={key} visibility="public" 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.homepage[key].owner.username}
                        user={this.props.username}
                        set="3"
                    />
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
        saved: state.firebase.data.saved,
    }
}

export default compose(
    firebaseConnect([
        { path: '/homepage', populates },
        '/saved',
    ]),
    connect(mapStateToProps),
)(HomePage)