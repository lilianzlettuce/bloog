
import './Card.css'

import TopBar from './TopBar'

import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class Card extends React.Component {
    constructor(props) {
        this.state = {
            saved: false,
        }
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