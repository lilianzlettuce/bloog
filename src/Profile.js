import './Profile.css'

import TopBar from './TopBar'
import Card from './Card'

import React from 'react'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { HashLink } from 'react-router-hash-link'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            name: '',
            error: '',
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState({ 
                username: this.props.user.username,
                name: this.props.user.displayName, 
            })
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
            this.setState({ 
                username: this.props.user.username,
                name: this.props.user.displayName,  
            })
        }

        let saveBtn = document.querySelector('#pf-save-btn')
        if (saveBtn && (!this.state.username.trim() || !this.state.name.trim())) {
            saveBtn.classList.remove('save-un-btn')
            saveBtn.classList.add('no-save-un-btn') 
            saveBtn.disabled = true 
        } else if (saveBtn) {
            saveBtn.classList.remove('no-save-un-btn')
            saveBtn.classList.add('save-un-btn')  
            saveBtn.disabled = false
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        document.querySelector('#pf-error').style.display = 'none'
    }

    editOn = () => {
        let edit = document.querySelector('#edit-container')
        edit.style.display = 'flex'
        edit.classList.remove('shrink')
        edit.classList.add('grow')

        document.querySelector('#cancel-un-btn').style.display = 'inline-block'
        document.querySelector('#pf-save-btn').style.display = 'inline-block'
    }

    cancel = () => {
        this.setState({ 
            username: this.props.user.username,
            name: this.props.user.displayName,
        })

        document.querySelector('#pf-error').style.display = 'none'
        this.shrinkAnim('#edit-container')
    }

    shrinkAnim = (id) => {
        let item = document.querySelector(id)
        item.classList.remove('grow')
        item.classList.add('shrink')
        setTimeout(() => {
            item.style.display = 'none'
            document.querySelector('#cancel-un-btn').style.display = 'none'
            document.querySelector('#pf-save-btn').style.display = 'none'
        }, 500);
    }

    saveProfile = () => {
        const un = this.state.username.trim()

        //check if username is taken
        const uns = this.props.usernames.slice()
        let index = uns.length
        for (let i = 0; i < uns.length; i++) {
            if (uns[i] === this.props.user.username) {
                index = i
            } else if (uns[i] === un && uns[i] !== this.props.user.username) {
                this.setState({ error: 'Username unavailable.' })
                document.querySelector('#pf-error').style.display = 'block'
                return
            }
        }

        this.props.firebase.updateProfile({
            displayName: this.state.name,
            username: this.state.username,
        }).catch((error) => {
            this.setState({ error: error })
            document.querySelector('#pf-error').style.display = 'block'
            return
        })

        //update un array
        let half1 = uns.slice(0, index)
        let half2 = uns.slice(index + 1)
        half2.push(un)
        let newUns = half1.concat(half2)

        console.log(half1)
        console.log(half2)
        this.props.firebase.database().ref('/usernames').set(newUns)
        
        this.shrinkAnim('#edit-container')
    }

    render() {
        if (!isLoaded(this.props.user, this.props.homepage, this.props.users) || (this.props.uid && !isLoaded(this.props.savedDecks))) {
            return <div>Loading...</div>
        }
    
        if (isEmpty(this.props.user)) {
            return <div>Page not found!</div>
        }

        let decksCreated = 0
        let decksSaved = 0
    
        const createdDecks = Object.keys(this.props.homepage).map((key) => {
            let deck = this.props.homepage[key]

            let visibility = 'public'
            if (!deck.public) {
                visibility = 'private'
            }
    
            if (this.props.users[deck.owner].username === this.props.user.username && (visibility === 'public' || this.props.user.username === this.props.username)) {
                decksCreated++
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={deck.name} 
                        owner={this.props.users[deck.owner].username}
                        owner_uid={deck.owner}
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
            let deck = this.props.homepage[key]
            
            let visibility = 'public'
            if (deck && !deck.public) {
                visibility = 'private'
            }
    
            if (deck && (deck.public || this.props.user.username === this.props.username)) {
                decksSaved++
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={deck.name} 
                        owner={this.props.users[deck.owner].username}
                        owner_uid={deck.owner}
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
                                <div className="stats-container">
                                    <div id="display-container">
                                        <div id="un-container">
                                            <span id="un-icon"><i className="far fa-user-circle"></i></span> {}
                                            <input
                                                id="un"
                                                className="pf-input"
                                                value={this.props.user.username}
                                                name="username"
                                                disabled
                                            />
                                        </div>
                                        <input
                                            id="name"
                                            className="pf-input"
                                            value={this.props.user.displayName}
                                            name="username"
                                            disabled
                                        />
                                        <div>
                                            <div className="stats">
                                                <HashLink className="stats-link" smooth to={`/profile/${this.props.user_uid}#created-decks`}><span className="bold">{decksCreated}</span> decks created</HashLink> {`\xa0\xa0`}
                                                <HashLink className="stats-link" smooth to={`/profile/${this.props.user_uid}#saved-decks`}><span className="bold">{decksSaved}</span> decks saved</HashLink></div>
                                        </div>
                                    </div>
                                </div>
                                {(this.props.uid && this.props.uid === this.props.user_uid) &&
                                    <div>
                                        <button id="edit-un-btn" onClick={this.editOn}><i className="fas fa-marker"></i> Edit Profile</button>
                                        <div id="edit-container">
                                            <div id="pf-error">{this.state.error}</div>
                                            <div>
                                                <span>Username: {'\xa0'}</span>
                                                <input
                                                    id="un-input"
                                                    className="edit-input"
                                                    value={this.state.username}
                                                    name="username"
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                            <br/> 
                                            <div>
                                                <span>Name: {'\xa0'}</span>
                                                <input
                                                    id="name-input"
                                                    className="edit-input"
                                                    value={this.state.name}
                                                    name="name"
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                            <br/> 
                                            <div>
                                                <span>Email: {'\xa0'}</span>
                                                <input
                                                    id="email-input"
                                                    className="edit-input"
                                                    value={this.props.user.email}
                                                    name="email"
                                                    onChange={(e) => this.handleChange(e)}
                                                    disabled
                                                />
                                            </div>
                                            <div id="pf-btn-container">
                                                <button id="cancel-un-btn" onClick={this.cancel}>Cancel</button>
                                                <button id="pf-save-btn" className="save-un-btn" onClick={this.saveProfile}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="section" id="created-decks">
                            <h2>Created Decks</h2>
                            <div className="deck-section">{createdDecks}</div>
                        </div>
                        <div className="section" id="saved-decks">
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
        usernames: state.firebase.data.usernames,
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
            '/usernames',
        ]
    }),
    connect(mapStateToProps),
)(HomePage)