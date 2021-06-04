import './HomePage.css'

import TopBar from './TopBar'

import { Link } from 'react-router-dom'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const HomePage = (props) => {
    if (!isLoaded(props.homepage)) {
        return <div>Loading...</div>
    }

    const savedDecks = Object.keys(props.homepage).map((key) => {
        if (props.homepage[key].saved) {
            return (
                <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                    <h3>{props.homepage[key].name}</h3>
                </Link>
            )
        }
        return (
            <div key={key}></div>
        )
    })

    const decks = Object.keys(props.homepage).map((key) => {
        return (
            <Link key={key} className="deck-container" to={`/viewer/${key}`}>
                <h3>{props.homepage[key].name}</h3>
            </Link>
        )
    })

    return (
        <div id="main">
            <TopBar />
            <div className="section">
                <h2>Saved Decks</h2>
                <div className="deck-section">{savedDecks}</div>
            </div>
            <div className="section">
                <h2>All Decks</h2>
                <div className="deck-section">{decks}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const homepage = state.firebase.data.homepage
    return { homepage: homepage }
}

export default compose(
    firebaseConnect([{ path: '/homepage', storeAs: 'homepage' }]),
    connect(mapStateToProps),
)(HomePage)