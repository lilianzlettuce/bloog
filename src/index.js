import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter } from 'react-router-dom'

import firebase from 'firebase/app'

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

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);