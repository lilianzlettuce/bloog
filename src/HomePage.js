import './HomePage.css'
import { hideDrop } from './hideDrop'

import TopBar from './TopBar'
import Card from './Card'

import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PageLoading from './PageLoading'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deckMode: 'my',
        }
    }

    componentDidMount() {
        if (this.props.uid) {
            this.setState({ deckMode: 'my' })
        } else {
            this.setState({ deckMode: 'public' })
        }
    }

    componentDidUpdate() {
        //adds new saved decks array for new users
        if (this.props.uid && this.props.saved && !Object.keys(this.props.saved).includes(this.props.uid)) {
            this.props.firebase.database()
                .ref()
                .child('saved')
                .child(this.props.uid).set({
                    0: '',
                })
        }
        this.updateStyle()
    }

    //changes which card group is displayed
    handleSelect = (e) => {
        let btn = document.querySelector(`#${e.target.htmlFor}-decks-btn`)
        if (btn) btn.checked = true
        this.setState({ deckMode: e.target.htmlFor })
    }

    //changes selector btn styles
    updateStyle = () => {
        let arr = ['public', 'my', 'saved']
        for (let i = 0; i < arr.length; i++) {
            let label = document.querySelector(`#${arr[i]}-label`)
            if (label && arr[i] === this.state.deckMode) {
                label.classList.add('select-on')
                label.classList.remove('select-off')
            } else if (label) {
                label.classList.add('select-off')
                label.classList.remove('select-on')
            }
        }
    }

    render() {
        if (!isLoaded(this.props.homepage, this.props.users)) {
            return <PageLoading />
        }
    
        let numMyDecks = 0
        let myDecks = Object.keys(this.props.homepage).map((key) => {
            let visibility = 'public'
            if (!this.props.homepage[key].public) {
                visibility = 'private'
            }
    
            if (this.props.users && this.props.users[this.props.homepage[key].owner].username === this.props.username) {
                numMyDecks++
                return (
                    <Card key={key} visibility={visibility} 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.users[this.props.homepage[key].owner].username}
                        owner_uid={this.props.homepage[key].owner}
                        user={this.props.username}
                        set="1"
                    />
                )
            }
            return (
                <div key={key}></div>
            )
        })
    
        let numSavedDecks
        let savedDecks 
        if (this.props.uid && this.props.saved && this.props.saved[this.props.uid]) {
            savedDecks = this.props.saved[this.props.uid].map((key) => {
                let deck = this.props.homepage[key]

                let visibility = 'public'
                if (deck && !deck.public) {
                    visibility = 'private'
                }
        
                if (deck && this.props.users && (deck.public || this.props.users[deck.owner].username === this.props.username)) {
                    numSavedDecks++
                    return (
                        <Card key={key} visibility={visibility} 
                            deckId={key}
                            deckName={this.props.homepage[key].name} 
                            owner={this.props.users[this.props.homepage[key].owner].username}
                            owner_uid={this.props.homepage[key].owner}
                            user={this.props.username}
                            set="2"
                        />
                    )
                }
                return (
                    <div key={key}></div>
                )
            })
        }
    
        const publicDecks = Object.keys(this.props.homepage).map((key) => {
            if (this.props.homepage[key].public) {
                return (
                    <Card key={key} visibility="public" 
                        deckId={key}
                        deckName={this.props.homepage[key].name} 
                        owner={this.props.users[this.props.homepage[key].owner].username}
                        owner_uid={this.props.homepage[key].owner}
                        user={this.props.username}
                        set="3"
                    />
                )
            }
            return (
                <div key={key}></div>
            )
        })

        const loginMessage = (deckType) => {
            return (
                <div className="no-decks-found">
                    <h1 className="nd-text1">No decks found! </h1>
                    <h1 className="nd-text1"><Link to="/login" className="nd-text2">Log in</Link> to {deckType} cards.</h1>
                </div>
            )
        }
    
        return (
            <div className="body-container" onClick={(e) => hideDrop(e)}>
                <div id="hp-main">
                    <TopBar />
                    <div className="section">
                        <div id="deck-types">
                            <label 
                                id="public-label"
                                className="select-btn select-on"
                                onClick={(e) => this.handleSelect(e)} 
                                htmlFor="public">
                                    Browse
                                    <input 
                                        id="public-decks-btn" 
                                        className="radio-btn" 
                                        defaultChecked 
                                        type="radio" 
                                        name="deck-type" 
                                        value="public" 
                                    />
                            </label>
                            <label 
                                id="my-label"
                                className="select-btn select-off"
                                onClick={(e) => this.handleSelect(e)} 
                                htmlFor="my">
                                    My Decks
                                    <input 
                                        id="my-decks-btn" 
                                        className="radio-btn" 
                                        type="radio" 
                                        name="deck-type" 
                                        value="my" 
                                    />
                            </label>
                            <label 
                                id="saved-label"
                                className="select-btn select-off"
                                onClick={(e) => this.handleSelect(e)} 
                                htmlFor="saved">
                                    Starred {'\xa0'}<i className="fas fa-star"></i>
                                    <input 
                                        id="saved-decks-btn" 
                                        className="radio-btn" 
                                        type="radio" 
                                        name="deck-type" 
                                        value="saved" 
                                    />
                            </label>
                        </div>
                        <div className="deck-section">
                            {this.state.deckMode === 'public' && publicDecks}
                            {(this.props.uid && this.state.deckMode === 'my') && myDecks}
                            {(!this.props.uid && this.state.deckMode === 'my') && loginMessage('create')}
                            {(this.props.uid && this.state.deckMode === 'saved') && savedDecks}
                            {(!this.props.uid && this.state.deckMode === 'saved') && loginMessage('save')}
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

const mapStateToProps = state => {
    const uid = state.firebase.auth.uid
    return { 
        homepage: state.firebase.data.homepage,
        username: state.firebase.profile.username,
        uid: uid,
        saved: state.firebase.data.saved,
        users: state.firebase.data.users,
    }
}

export default compose(
    firebaseConnect([
        { path: '/homepage'},
        '/saved',
        '/users',
    ]),
    connect(mapStateToProps),
)(HomePage)