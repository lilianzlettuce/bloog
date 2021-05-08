import React/*, { useState }*/ from 'react'
import './CardViewer.css'

import { Link } from 'react-router-dom'

export default class CardViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCard: 0,
      front: true,
      cards: this.props.cards,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, false)
  }

  keyDown = (e) => {
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
    let numCards = this.props.cards.length

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
    let pbPosition = 230 + 200 * (num / (this.props.cards.length - 1))
    document.querySelector('#pb2').style.top = `-${pbPosition}px`
  }

  render() {
    return (
      <div className="container">
        <div className="heading">
          <div></div>
          <button className="switch-btn">
            <Link to="/editor">Edit Cards →</Link>
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
            <div id="progress">{(this.state.currentCard + 1) + ' / ' + this.props.cards.length}</div>
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