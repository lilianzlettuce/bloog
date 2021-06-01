import './HomePage.css'

import TopBar from './TopBar'

import { Link, withRouter } from 'react-router-dom'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

const HomePage = (props) => {
    /*const decks = this.props.decks.map((deck, index) => {
        <Link className="btn-container" to="/viewer">

        </Link>
    })*/

    return (
        <div id="main">
            <TopBar />
            <div className="section">
                {}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state.firebase.data.homepage)
    return {homepage: state.firebase.data.homepage}
}

export default compose(
    withRouter,
    firebaseConnect([{path: '/homepage'}]),
    connect(mapStateToProps),
)(HomePage)