import React from 'react'
import './CardViewer.css'

import TopBar from './TopBar'

import { Link, withRouter } from 'react-router-dom'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class CardViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCard: 0,
      front: true,
      cards: this.props.cards,
      saved: this.props.saved,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown, false)
    this.updateStyling()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, false)
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      this.setState({ cards: this.props.cards })
    }
    if (this.props.saved !== prevProps.saved) {
      this.setState({ saved: this.props.saved })
    }
    this.updateStyling()
  }

  updateStyling = () => {
    //saved btn styling
    let savedBtn = document.querySelector('#save-btn')
    if (savedBtn && this.state.saved) {
      savedBtn.classList.add('unsave-btn')
      savedBtn.classList.remove('save-btn')
      savedBtn.textContent = "Saved ✓"
    } else if (savedBtn) {
      savedBtn.classList.add('save-btn')
      savedBtn.classList.remove('unsave-btn')
      savedBtn.textContent = "Save Deck"
    }
  }

  keyDown = (e) => {
    e.preventDefault()
    switch(e.key) {
      case 'ArrowUp':
        this.cardUp()
        break
      case 'ArrowDown': 
        this.cardDown()
        break
      case 'ArrowRight':
        this.flipCard()
        break
      case 'ArrowLeft':
        this.flipCard()
        break
      default:
        return
    }
  }

  shuffle = () => {
    //ui updates
    this.setBtnStyle('up', 'var(--main)', 'pointer')
    this.setBtnStyle('down', 'var(--lighter)', 'auto')
    this.setPB(0)

    let oldCards = this.state.cards.slice()
    let newCards = []
    let taken = []
    
    //randomize cards
    for (let i = 0; i < oldCards.length; i++) {
      let isNew = false
      let newCard
      let randInt
      while (!isNew) {
        isNew = true
        randInt = Math.floor(Math.random() * this.state.cards.length)
        newCard = oldCards[randInt]
        for (let j = 0; j < taken.length; j++) {
          if (randInt === taken[j]) isNew = false
        }
      }
      newCards.push(newCard)
      taken.push(randInt)
    }

    //card anim
    let card = document.querySelector('#card')
    card.style.top = '-30px'
    setTimeout(() => {
      card.style.top = '0px'
      this.toFront()
    }, 200)
    setTimeout(() => {
      card.style.top = '-30px'
      this.toBack()
    }, 400)
    setTimeout(() => {
      card.style.top = '0px'

      this.setState({
        currentCard: 0,
        front: true,
        cards: newCards,
      })

      this.toFront()
    }, 600)
  }

  flipCard = () => {
    if (this.state.front) {
      this.toBack()
    } else {
      this.toFront()
    }
  }

  //flip to front
  toFront = () => {
    //ui updates
    document.querySelector('#card').style.transform = 'rotateY(0deg)'
    setTimeout(() => {
      document.querySelector('#text-display-front').style.display = 'block'
      document.querySelector('#text-display-back').style.display = 'none'
    }, 150);
    
    this.setState({ front: true })
  }

  //flip to back
  toBack = () => {
    //ui updates
    document.querySelector('#card').style.transform = 'rotateY(180deg)'
    setTimeout(() => {
      document.querySelector('#text-display-front').style.display = 'none'
      document.querySelector('#text-display-back').style.display = 'block'
    }, 150);

    this.setState({ front: false })
  }

  //next card
  cardUp = () => {
    let current = this.state.currentCard
    let numCards = this.state.cards.length

    //btn style
    this.setBtnStyle('down', 'var(--main)', 'pointer')
    if (current === numCards - 2) {
      this.setBtnStyle('up', 'var(--lighter)', 'auto')
    }

    if (current !== numCards - 1) {
      //card anim
      let card = document.querySelector('#card')
      card.style.top = '30px'
      setTimeout(() => {
        card.style.top = '0px'
      }, 200);

      //progress bar anim
      this.setPB(current + 1)

      this.setState({ currentCard: this.state.currentCard + 1 })

      //prevent seeing back of card
      if (!this.state.front) {
        document.querySelector('#text-display-front').style.display = 'none'
        document.querySelector('#text-display-back').style.display = 'none'
        this.toFront()
      }
    }
  }

  //previous card
  cardDown = () => {
    let current = this.state.currentCard

    //btn style
    this.setBtnStyle('up', 'var(--main)', 'pointer')
    if (current === 1) {
      this.setBtnStyle('down', 'var(--lighter)', 'auto')
    }
    
    if (current !== 0) {
      //card anim
      let card = document.querySelector('#card')
      card.style.top = '30px'
      setTimeout(() => {
        card.style.top = '0px'
      }, 200);

      //progress bar anim
      this.setPB(current - 1)

      this.setState({ currentCard: this.state.currentCard - 1 })

      //prevent seeing back of card
      if (!this.state.front) {
        document.querySelector('#text-display-front').style.display = 'none'
        document.querySelector('#text-display-back').style.display = 'none'
        this.toFront()
      }
    }
  }

  //changes up/down btn style
  setBtnStyle = (name, color, cursor) => {
    let btn = document.querySelector(`#${name}-btn`)
    btn.style.color = color
    btn.style.cursor = cursor
  }

  //changes progress bar
  setPB = (num) => {
    let pbPosition = 230 + 200 * (num / (this.state.cards.length - 1))
    document.querySelector('#pb2').style.top = `-${pbPosition}px`
  }

  saveDeck = () => {
    let saved = true
    if (this.state.saved) {
      saved = false
    }

    //update saved status in database
    let deckId = this.props.deckId
      let updates = {}
      updates[`/flashcards/${deckId}`] = {
        cards: this.props.cards,
        name: this.props.name,
        saved: saved,
      }
      updates[`/homepage/${deckId}`] = { 
        name: this.props.name,
        saved: saved,
      }
      this.props.firebase.update('/', updates)
  }

  render() {
    if (!isLoaded(this.state.cards)) {
      return <div>Loading...</div>
    }

    if (isEmpty(this.state.cards)) {
      return <div>Page not found!</div>
    }

    return (
      <div className="container">
        <TopBar />
        <div className="heading">
          <div className="cardset-name">{this.props.name}</div>
          <button
            className="save-btn"
            id="save-btn"
            onClick={this.saveDeck}
          >
            Save Deck
          </button>
        </div>
        <div id="body">
          <div id="card-container">
            <div id="card" onClick={this.flipCard}>
              <div id="text-display-front" >{this.state.cards[this.state.currentCard].front}</div>
              <div id="text-display-back" >{this.state.cards[this.state.currentCard].back}</div>
            </div>
            <div id="controls">
              <button id="up-btn" className="control-btn" onClick={this.cardUp}><i className="fas fa-angle-up"></i></button>
              <button id="down-btn" className="control-btn" onClick={this.cardDown}><i className="fas fa-angle-down"></i></button>
            </div>
          </div>
          <button id="shuffle-btn" onClick={this.shuffle} ><i className="fas fa-random"></i></button>
          <div id="progress-container">
            <div id="progress">{(this.state.currentCard + 1) + ' / ' + this.state.cards.length}</div>
            <div id="pb-container">
              <div id="pb1"></div>
              <div id="pb3"></div>
              <div id="pb2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const deckId = props.match.params.deckId
  const deck = state.firebase.data[deckId]
  const name = deck && deck.name
  const cards = deck && deck.cards
  const saved = deck&& deck.saved
  return { cards: cards, name: name, saved: saved, deckId: deckId }
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    console.log("props: " + props)
    const deckId = props.match.params.deckId
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId}]
  }),
  connect(mapStateToProps),
)(CardViewer)

