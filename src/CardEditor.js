import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import './CardEditor.css'

import TopBar from './TopBar'

import { withRouter, Redirect } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

class CardEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      front: '',
      back: '',
      name: 'My Awesome Card Set',
      cards: [
        {
          front: 'BLOOG',
          back: 'bob loves oily orange geese',
        },
      ],
      public: false,
    }
  }

  componentDidUpdate() {
    //creat btn styling
    let createBtn = document.querySelector('#create-btn')
    if (this.state.name.trim() && this.state.cards.length > 0) {
      createBtn.classList.add('usable-btn')
      createBtn.classList.remove('unusable-btn')
    } else {
      createBtn.classList.add('unusable-btn')
      createBtn.classList.remove('usable-btn')
    }
  }

  addCard = () => {
    const newCard = {
      front: this.state.front,
      back: this.state.back,
    }
    const cards = this.state.cards.slice().concat(newCard)
    this.setState({ 
      front: '', 
      back: '',
      name: this.state.name,
      cards,
    })
  }

  deleteCard = i => {
    const cards = this.state.cards.slice()
    cards.splice(i, 1)
    this.setState({ cards })
  }

  //for add card and name inputs
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  //edit existing card
  handleChangeCard = (i, val, side) => {
    let half1 = this.state.cards.slice(0, i)
    let half2 = this.state.cards.slice(i + 1)

    let newCard
    if (side === 'front') {
      newCard = {
        front: val,
        back: this.state.cards[i].back,
      }
    } else {
      newCard = {
        front: this.state.cards[i].front,
        back: val,
      }
    }

    this.setState({ cards: half1.concat(newCard).concat(half2) })
  }

  createDeck = () => {
    const deckId = this.props.firebase.push('/flashcards').key
    const updates = {}
    const newDeck = {
      cards: this.state.cards,
      name: this.state.name,
      owner: this.props.uid,
      public: this.state.public,
    }
    updates[`/flashcards/${deckId}`] = newDeck
    updates[`/homepage/${deckId}`] = { 
      name: this.state.name,
      owner: this.props.uid,
      public: this.state.public,
    }
    this.props.firebase.update('/', updates, () => {
      //redirect route after firebase has updated
      this.props.history.push(`/viewer/${deckId}`)
    })
  }

  render() {
    if (!this.props.uid) {
      return <Redirect to="/register" />
    }

    const cards = this.state.cards.map((card, index) => {
      return (
        <tr key={index} className="row">
          <td className="index-box"><div className="index">{index + 1}</div></td>
          <td className="front-box" >
            <TextareaAutosize 
              cacheMeasurements
              id={"front" + index}
              className="card-text"
              name={"front" + index}
              onChange={(e) => {
                this.handleChangeCard(index, e.target.value, 'front')
              }}
              value={card.front}
            />
          </td>
          <td className="back-box" >
            <TextareaAutosize
              cacheMeasurements 
              id={"back" + index}
              className="card-text"
              name={"back" + index}
              onChange={(e) => {
                this.handleChangeCard(index, e.target.value, 'back')
              }}
              value={card.back}
            />
          </td>
          <td className="delete-box">
            <button className="delete-btn" onClick={() => this.deleteCard(index)} ><i className="fas fa-times"></i></button>
          </td>
        </tr>
      )
    })
  
    return (
      <div className="container">
        <TopBar />
        <div className="heading">
          <TextareaAutosize
            cacheMeasurements
            name="name"
            id="name-input"
            className="cardset-name"
            onChange={(e) => {
              this.handleChange(e)
            }}
            placeholder="Cardset Title"
            value={this.state.name}
          />
          <button
            className="usable-btn"
            id="create-btn"
            onClick={this.createDeck}
            disabled={!this.state.name.trim() || this.state.cards.length === 0}
          >
            Create Deck
          </button>
        </div>
        <table id="editor-table">
          <thead>
            <tr>
              <th></th>
              <th id="front-col"></th>
              <th id="back-col"></th>
              <th id="delete-col"></th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br />
        <div id="input-container">
          <TextareaAutosize
            cacheMeasurements
            className="input"
            name="front"
            onChange={this.handleChange}
            placeholder="Front of card"
            value={this.state.front}
          />
          <TextareaAutosize
            cacheMeasurements
            className="input"
            name="back"
            onChange={this.handleChange}
            placeholder="Back of card"
            value={this.state.back}
          />
          <button className="add-btn" onClick={this.addCard} ><i className="fas fa-plus"></i></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    uid: state.firebase.auth.uid,
    username: state.firebase.profile.username,
  }
}

export default compose(
  firebaseConnect(), 
  connect(mapStateToProps), 
  withRouter
)(CardEditor)