import './Card.css'

import React from 'react'
import { withRouter } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
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
        if (this.props.savedDecks !== prevProps.savedDecks) {
            if (this.props.savedDecks && this.props.savedDecks[this.props.uid] && this.props.savedDecks[this.props.uid].includes(this.props.deckId)) {
                this.setState({ saved: true })
            } else {
                this.setState({ saved: false })
            }
        }
        this.updateStyling()
    }
    
    updateStyling = () => {
        this.updateCheckBtns(`#save-icon${this.props.deckId + this.props.set}`, 'saved', '', '', 'fas', 'far')
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
        if (!this.props.uid) {
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
        if (this.props.uid && !isLoaded(this.props.savedDecks, this.props.uid)) {
            return (
                <div className="link-container">
                    <HashLink className="deck-container">
                        <div>
                            <h3>...</h3>
                            {(this.props.owner === this.props.user) && <div className={this.props.visibility}>{this.props.visibility}</div>}
                        </div>
                        {(this.props.owner !== this.props.user) && <h4 className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.owner}</h4>}
                        {(this.props.owner === this.props.user) && <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.owner}</h4>}
                    </HashLink>
                </div>
            )
        }

        const deckName = () => {
            if (this.props.deckName.length < 26) {
                return <h3>{this.props.deckName}</h3>
            } else {
                return <h3>{this.props.deckName.substring(0, 26) + '...'}</h3>
            }
        }

        return (
            <div className="link-container">
                <button
                    id={"homepage-save" + this.props.deckId + this.props.set}
                    className="homepage-save"
                    onClick={this.saveDeck}
                >
                    <i id={"save-icon" + this.props.deckId + this.props.set} className="far fa-star"></i>
                </button>
                <HashLink className="deck-container" to={`/viewer/${this.props.deckId}`}>
                    <div>
                        {deckName()}
                        {(this.props.owner === this.props.user) && <div className={this.props.visibility}>{this.props.visibility}</div>}
                    </div>
                </HashLink>
                {(this.props.owner !== this.props.user) && <HashLink smooth to={`/profile/${this.props.owner_uid}#body`} className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.owner}</HashLink>}
                {(this.props.owner === this.props.user) && <HashLink smooth to={`/profile/${this.props.owner_uid}#body`} className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + this.props.owner}</HashLink>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        uid: state.firebase.auth.uid,
        savedDecks: state.firebase.data.saved,
    }
}

export default compose(
    withRouter,
    firebaseConnect([
        '/saved',
    ]),
    connect(mapStateToProps),
)(Card)