import './HomePage.css'

import TopBar from './TopBar'

import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const HomePage = (props) => {

    if (!isLoaded(props.homepage)) {
        return <div>Loading...</div>
    }

    const myDecks = Object.keys(props.homepage).map((key) => {
        let visibility = 'public'
        if (!props.homepage[key].public) {
            visibility = 'private'
        }

        if (props.homepage[key].owner === props.username) {
            return (
                <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                    <div>
                        <h3>{props.homepage[key].name}</h3>
                        <div className={visibility}>{visibility}</div>
                    </div>
                    <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + props.homepage[key].owner}</h4>
                </Link>
            )
        }
        return (
            <div key={key}></div>
        )
    })

    const savedDecks = Object.keys(props.homepage).map((key) => {
        let visibility = 'public'
        if (!props.homepage[key].public) {
            visibility = 'private'
        }

        if (props.homepage[key].saved) {
            return (
                <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                    <div>
                        <h3>{props.homepage[key].name}</h3>
                        {(props.homepage[key].owner === props.username) && <div className={visibility}>{visibility}</div>}
                    </div>
                    {(props.homepage[key].owner !== props.username) && <h4 className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + props.homepage[key].owner}</h4>}
                    {(props.homepage[key].owner === props.username) && <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + props.homepage[key].owner}</h4>}
                </Link>
            )
        }
        return (
            <div key={key}></div>
        )
    })

    const publicDecks = Object.keys(props.homepage).map((key) => {
        let visibility = 'public'
        if (!props.homepage[key].public) {
            visibility = 'private'
        }

        if (props.homepage[key].public) {
            return (
                <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                    <div>
                        <h3>{props.homepage[key].name}</h3>
                        {(props.homepage[key].owner === props.username) && <div className={visibility}>{visibility}</div>}
                    </div>
                    {(props.homepage[key].owner !== props.username) && <h4 className="owner"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + props.homepage[key].owner}</h4>}
                    {(props.homepage[key].owner === props.username) && <h4 className="owner you"><i className="fas fa-user-circle"></i>{`\xa0\xa0\xa0` + props.homepage[key].owner}</h4>}
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
            {(props.username) &&
                <div className="section">
                    <h2>My Decks</h2>
                    <div className="deck-section">{myDecks}</div>
                </div>
            }
            {(props.username) &&
                <div className="section">
                    <h2>Saved Decks</h2>
                    <div className="deck-section">{savedDecks}</div>
                </div>
            }
            <div className="section">
                <h2>Public Decks</h2>
                <div className="deck-section">{publicDecks}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        homepage: state.firebase.data.homepage,
        username: state.firebase.profile.username,
    }
}

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
)(HomePage)