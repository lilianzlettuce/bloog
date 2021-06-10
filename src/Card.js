
import './Card.css'

import TopBar from './TopBar'

import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
        }
    }

    componentDidMount() {
        //set correct value for saved
        if (this.props.savedDecks && this.props.savedDecks[this.props.uid] && this.props.savedDecks[this.props.uid].includes(this.props.deckId)) {
            this.setState({ saved: true })
        }
        this.updateStyling()
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({ cards: this.props.cards })
        }
        if (this.props.pub !== prevProps.pub) {
            this.setState({ pub: this.props.pub })
        }
        if (this.props.savedDecks !== prevProps.savedDecks) {
            if (this.props.savedDecks && this.props.savedDecks[this.props.uid] && this.props.savedDecks[this.props.uid].includes(this.props.deckId)) {
                this.setState({ saved: true })
            }
        }
        this.updateStyling()
      }
    
    updateStyling = () => {
        this.updateCheckBtns('#public-btn', 'pub', 'Public ✓', 'Make Public', 'uncheck-btn', 'check-btn')
        this.updateCheckBtns('#save-icon', 'saved', '', '', 'fas', 'far')
    }
    
    updateCheckBtns = (id, key, text1, text2, class1, class2) => {
        let btn = document.querySelector(id)
        if (btn && this.state[key]) {
            btn.classList.add(class1)
            btn.classList.remove(class2)
            btn.textContent = text1
        } else if (btn) {
            btn.classList.add(class2)
            btn.classList.remove(class1)
            btn.textContent = text2
        }
    }

    saveDeck = () => {
        if (!this.props.username) {
            this.props.history.push('/register')
            return
        }
    
        let updates = {}
        let uid = this.props.uid
        let saved = this.props.savedDecks[uid].slice()
        let deckId = this.props.deckId
        if (saved.includes(deckId)) {
            this.setState({ saved: false })

            let i = saved.indexOf(deckId)
            let half1 = saved.slice(0, i)
            let half2 = saved.slice(i + 1)
            saved = half1.concat(half2)
        } else {
            this.setState({ saved: true })

            let half1 = saved.slice()
            let half2 = [deckId]
            saved = half1.concat(half2)
        }
    
        updates[`/saved/${uid}`] = saved
        this.props.firebase.update('/', updates)
    }

    render() {
        return (
            <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                <div>
                    <h3>{this.props.homepage[key].name}</h3>
                    {(this.props.homepage[key].owner.username === this.props.username) && <div className={visibility}>{visibility}</div>}
                </div>
                <button
                    id="homepage-save"
                    onClick={this.saveDeck}
                >
                    <i id= "save-icon" className="far fa-heart"></i>
                </button>
                {(this.props.homepage[key].owner.username !== this.props.username) && <h4 className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>}
                {(this.props.homepage[key].owner.username === this.props.username) && <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.homepage[key].owner.username}</h4>}
            </Link>
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