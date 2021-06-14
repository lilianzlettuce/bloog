import React from 'react'
import HomePage from './HomePage'
import CardEditor from './CardEditor'
import CardViewer from './CardViewer'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import Profile from './Profile'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import PageNotFound from './PageNotFound'
import PageLoading from './PageLoading'

const App = props => {
  if (!isLoaded(props.auth, props.profile)) {
    return <PageLoading />
  }

  return (
    <Switch>
        <Route exact path="/">
            <HomePage />
        </Route>
        <Route exact path="/editor">
            <CardEditor />
        </Route>
        <Route exact path="/viewer/:deckId">
            <CardViewer />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/profile/:uid">
            <Profile />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
    </Switch>
  )
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth, profile: state.firebase.profile }
}

export default connect(mapStateToProps)(App)