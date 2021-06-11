import './Profile.css'

import TopBar from './TopBar'
import Card from './Card'

import React from 'react'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState({ username: this.props.user.username })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.uid && this.props.saved && !Object.keys(this.props.saved).includes(this.props.uid)) {
            this.props.firebase.database()
                .ref()
                .child('saved')
                .child(this.props.uid).set({
                0: '',
            })
        }
        if (this.props.user !== prevProps.user) {
            this.setState({ username: this.props.user.username })
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    editOn = () => {
        document.querySelector('#un-input').disabled = false
        document.querySelector('#edit-un-btn').style.display = 'none'
        document.querySelector('#cancel-un-btn').style.display = 'inline-block'
        document.querySelector('#save-un-btn').style.display = 'inline-block'
    }

    cancel = () => {
        this.setState({ username: this.props.user.username })

        document.querySelector('#un-input').disabled = true
        document.querySelector('#edit-un-btn').style.display = 'inline-block'
        document.querySelector('#cancel-un-btn').style.display = 'none'
        document.querySelector('#save-un-btn').style.display = 'none'
    }

    render() {
        if (!isLoaded(this.props.user, this.props.homepage, this.props.users) || (this.props.uid && !isLoaded(this.props.savedDecks))) {
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
    
            if (this.props.users[this.props.homepage[key].owner].username === this.props.user.username && (visibility === 'public' || this.props.user.username === this.props.username)) {
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.users[this.props.homepage[key].owner].username}
                        owner_uid={this.props.homepage[key].owner}
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
                        owner={this.props.users[this.props.homepage[key].owner].username}
                        owner_uid={this.props.homepage[key].owner}
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
            <div id="body">
                <div id="main">
                    <TopBar />
                    <div>
                        <div className="section" id="pf-section">
                            <div className="profile">
                                <i className="far fa-user-circle"></i> {`\xa0\xa0`}
                                <input
                                    id="un-input"
                                    value={this.state.username}
                                    name="username"
                                    onChange={(e) => this.handleChange(e)}
                                    disabled
                                />
                                {(this.props.uid && this.props.uid === this.props.user_uid) &&
                                    <div>
                                        <button id="edit-un-btn" onClick={this.editOn}><i className="fas fa-marker"></i></button>
                                        <button id="cancel-un-btn" onClick={this.cancel}>Cancel</button>
                                        <button id="save-un-btn">Save</button>
                                    </div>
                                }
                            </div>
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
            </div>
        )
    }
}

/*const populates = [
    { child: 'owner', root: 'users' }
]*/

const mapStateToProps = (state, props) => {
    const uid = state.firebase.auth.uid
    const user_uid = props.match.params.uid
    const users = state.firebase.data.users
    let user
    if (users) {
        user = users[user_uid]
    }
    return { 
        homepage: state.firebase.data.homepage,
        uid: uid,
        username: state.firebase.profile.username,
        savedDecks: state.firebase.data.saved,
        users: users,
        user: user,
        user_uid: user_uid,
    }
}

export default compose(
    withRouter,
    firebaseConnect(() => {
        return [
            '/homepage',
            '/saved',
            '/users',
        ]
    }),
    connect(mapStateToProps),
)(HomePage)