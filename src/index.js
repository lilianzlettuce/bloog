import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQsDT1fC0mM4eJjXkT1oVk8_KsxAYuB2Q",
  authDomain: "bloog-ef82f.firebaseapp.com",
  databaseURL: "https://bloog-ef82f-default-rtdb.firebaseio.com",
  projectId: "bloog-ef82f",
  storageBucket: "bloog-ef82f.appspot.com",
  messagingSenderId: "107564342878",
  appId: "1:107564342878:web:0d2306833239e886c25ecf",
  measurementId: "G-7GTS7XRXMQ"
};

firebase.initializeApp(firebaseConfig)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const store = createStore(rootReducer)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.querySelector('#root')
);