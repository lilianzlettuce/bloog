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

        if (!isLoaded(this.props.user, this.props.homepage) || (this.props.uid && !isLoaded(this.props.savedDecks))) {
            return <div>Loading...</div>
        }
    
        if (isEmpty(this.props.user)) {
            return <div>Page not found!</div>
        }
    
        const createdDecks = Object.keys(this.props.homepage).map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
    
            if (this.props.homepage[key].owner.username === this.props.user.username && (visibility === 'public' || this.props.user.username === this.props.username)) {
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.homepage[key].owner.username}
                        user={this.props.username}
                        set="4"
                    />
                )
            }
            return (
                <div key={key}></div>
            )
        })
    
        const savedDecks = this.props.savedDecks[this.props.user_uid].map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
    
            if ((this.props.homepage[key].public || this.props.user.username === this.props.username)) {
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.homepage[key].owner.username}
                        user={this.props.username}
                        set="5"
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
                    <div className="section" id="pf-section">
                        <div className="profile"><i className="far fa-user-circle pfp"></i> {`\xa0\xa0` + this.props.user.username}</div>
                    </div>
                    <div className="section">
                        <h2>Created Decks</h2>
                        <div className="deck-section">{createdDecks}</div>
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
        username: state.firebase.profile.username,
        savedDecks: state.firebase.data.saved,
        user: user,
        user_uid: user_uid,
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