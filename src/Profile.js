import './Profile.css'

import TopBar from './TopBar'
import Card from './Card'

import React from 'react'
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'

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

        if (!isLoaded(this.state.user) || (this.props.uid && !isLoaded(this.props.savedDecks))) {
            return <div>Loading...</div>
        }
    
        if (isEmpty(this.state.cards)) {
            return <div>Page not found!</div>
        }
    
        const myDecks = Object.keys(this.props.homepage).map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
    
            if (this.props.homepage[key].owner.username === this.props.username) {
                return (
                    <Card key={key} visibility="public" 
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
    
        return (
            <div id="main">
                <TopBar />
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
            </div>
        )
    }
}

const populates = [
    { child: 'owner', root: 'users' }
]

const mapStateToProps = (state, props) => {
    const uid = state.firebase.auth.uid
    const user_uid = props.match.params.uid
    const user = state.firebase.data[user_uid]
    return { 
        homepage: populate(state.firebase, 'homepage', populates),
        uid: uid,
        saved: state.firebase.data.saved,
        user: user,
    }
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        const uid = props.match.params.uid
        return [
            { path: '/homepage', populates },
            { path: `/users/${uid}`, storeAs: uid },
            '/saved',
        ]
    }),
    connect(mapStateToProps),
)(HomePage)