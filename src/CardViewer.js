import React from 'react'
import './CardViewer.css'

import TopBar from './TopBar'

import { withRouter } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { firebaseConnect, isEmpty, isLoaded, /*populate*/ } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class CardViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCard: 0,
      front: true,
      cards: this.props.cards,
      pub: this.props.pub,
      saved: false,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown, false)
    //set correct value for saved
    if (this.props.savedDecks && this.props.savedDecks[this.props.uid] && this.props.savedDecks[this.props.uid].includes(this.props.deckId)) {
      this.setState({ saved: true })
    }
    this.updateStyling()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, false)
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      this.setState({ cards: this.props.cards })
    }
    if (this.props.pub !== prevProps.pub) {
      this.setState({ pub: this.props.pub })
    }
    if (this.props.savedDecks !== prevProps.savedDecks) {
      if (this.props.savedDecks && this.props.savedDecks[this.props.uid] && this.props.savedDecks[this.props.uid].includes(this.props.deckId)) {
        this.setState({ saved: true })
      }
    }
    this.updateStyling()
  }

  updateStyling = () => {
    this.updateCheckBtns('#public-btn', 'pub', 'Public ✓', 'Make Public', 'uncheck-btn', 'check-btn')
    this.updateCheckBtns('#save-icon', 'saved', '', '', 'fas', 'far')
  }

  updateCheckBtns = (id, key, text1, text2, class1, class2) => {
    let btn = document.querySelector(id)
    if (btn && this.state[key]) {
      btn.classList.add(class1)
      btn.classList.remove(class2)
      btn.textContent = text1
    } else if (btn) {
      btn.classList.add(class2)
      btn.classList.remove(class1)
      btn.textContent = text2
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

  updateDeck = (key) => {
    let pub = this.state.pub
    if (key === 'pub') {
      pub = !this.state.pub
    }

    let deckId = this.props.deckId
      let updates = {}
      updates[`/flashcards/${deckId}`] = {
        cards: this.props.cards,
        name: this.props.name,
        owner: this.props.owner,
        public: pub,
      }
      updates[`/homepage/${deckId}`] = { 
        name: this.props.name,
        owner: this.props.owner,
        public: pub,
      }
      this.props.firebase.update('/', updates)
  }

  saveDeck = () => {
    if (!this.props.username) {
      this.props.history.push('/register')
      return
    }

    let updates = {}
    let uid = this.props.uid
    let saved = this.props.savedDecks[uid].slice()
    let deckId = this.props.deckId
    if (saved.includes(deckId)) {
      this.setState({ saved: false })

      let i = saved.indexOf(deckId)
      let half1 = saved.slice(0, i)
      let half2 = saved.slice(i + 1)
      saved = half1.concat(half2)
    } else {
      this.setState({ saved: true })

      let half1 = saved.slice()
      let half2 = [deckId]
      saved = half1.concat(half2)
    }

    updates[`/saved/${uid}`] = saved
    this.props.firebase.update('/', updates)
  }

  render() {
    if (!isLoaded(this.state.cards) || (this.props.uid && !isLoaded(this.props.savedDecks))) {
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
          <div className="btn-container">
            {(this.props.deck && this.props.users[this.props.owner].username === this.props.username) &&
              <button
                className="check-btn"
                id="public-btn"
                onClick={() => this.updateDeck('pub')}
              >
                Make Public
              </button>
            }
            <button
              id="save-btn"
              onClick={this.saveDeck}
            >
              <i id= "save-icon" className="far fa-heart"></i>
            </button>
          </div>
        </div>
        <div id="cv-body">
          <div id="card-container">
            <div id="card" onClick={this.flipCard}>
              <div id="text-display-front" >{this.state.cards[this.state.currentCard].front}</div>
              <div id="text-display-back" >{this.state.cards[this.state.currentCard].back}</div>
            </div>
            <div className="controls-container">
              <button id="shuffle-btn" onClick={this.shuffle} ><i className="fas fa-random"></i></button>
              <div id="controls">
                <button id="up-btn" className="control-btn" onClick={this.cardUp}><i className="fas fa-angle-up"></i></button>
                <button id="down-btn" className="control-btn" onClick={this.cardDown}><i className="fas fa-angle-down"></i></button>
              </div>
              <HashLink to={`/profile/${this.props.owner}`} className="cv-owner">Created by{'\xa0'} <i className="fas fa-user-circle"></i> {this.props.users[this.props.owner].username}</HashLink>
            </div>
          </div>
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

/*const populates = [
  { child: 'owner', root: 'users' }
]*/

const mapStateToProps = (state, props) => {
  const deckId = props.match.params.deckId
  const deck = state.firebase.data[deckId]
  const uid = state.firebase.auth.uid
  return { 
    cards: deck && deck.cards, 
    name: deck && deck.name, 
    pub: deck && deck.public,
    owner: deck && deck.owner,
    deckId: deckId,
    /*deck: populate(state.firebase, deckId , populates),*/
    deck: deck,
    username: state.firebase.profile.username,
    uid: uid,
    savedDecks: state.firebase.data.saved,
    users: state.firebase.data.users,
  }
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId
    return [
      { path: `/flashcards/${deckId}`, storeAs: deckId},
      '/saved',
      '/users',
    ]
  }),
  connect(mapStateToProps),
)(CardViewer)

