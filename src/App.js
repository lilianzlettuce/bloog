import React from 'react'
import HomePage from './HomePage'
import CardEditor from './CardEditor'
import CardViewer from './CardViewer'

import { Route, Switch } from 'react-router-dom'

const App = () => {
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
        <Route>
          <div>Page not found!</div>
        </Route>
    </Switch>
  )
}

export default App