import './HomePage.css'

import TopBar from './TopBar'

import { Link, withRouter } from 'react-router-dom'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const HomePage = (props) => {
    if (!isLoaded(props.homepage)) {
        return <div>Loading...</div>
    }

    if (isEmpty(props.homepage)) {
        return <div>Page not found!</div>
    }

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
                <h2>Decks</h2>
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
    withRouter,
    firebaseConnect([{ path: '/homepage', storeAs: 'homepage' }]),
    connect(mapStateToProps),
)(HomePage)