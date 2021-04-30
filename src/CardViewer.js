import React, { useState } from 'react'
import './CardViewer.css'

export default class CardViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCard: 0,
      front: true,
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
    let down = document.querySelector('#down-btn')
    down.style.color = 'var(--main)'
    down.style.cursor = 'pointer'
    if (current === numCards - 2) {
      let up = document.querySelector('#up-btn')
      up.style.color = 'var(--lighter)'
      up.style.cursor = 'auto'
    }

    if (current !== numCards - 1) {
      //card anim
      let card = document.querySelector('#card')
      card.style.top = '30px'
      setTimeout(() => {
        card.style.top = '0px'
      }, 200);

      //progress bar anim
      let pbPosition = 230 + 200 * ((current + 1) / (numCards - 1))
      document.querySelector('#pb2').style.top = `-${pbPosition}px`

      this.setState({ currentCard: this.state.currentCard + 1 })
      this.toFront()
    }
  }

  //previous card
  cardDown = () => {
    let current = this.state.currentCard
    let numCards = this.props.cards.length

    //btn style
    let up = document.querySelector('#up-btn')
    up.style.color = 'var(--main)'
    up.style.cursor = 'pointer'
    if (current === 1) {
      let down = document.querySelector('#down-btn')
      down.style.color = 'var(--lighter)'
      down.style.cursor = 'auto'
    }
    
    if (current !== 0) {
      //card anim
      let card = document.querySelector('#card')
      card.style.top = '30px'
      setTimeout(() => {
        card.style.top = '0px'
      }, 200);

      //progress bar anim
      let pbPosition = 230 + 200 * ((current - 1) / (numCards - 1))
      document.querySelector('#pb2').style.top = `-${pbPosition}px`

      this.setState({ currentCard: this.state.currentCard - 1 })
      this.toFront()
    }
  }

  render() {
    return (
      <div className="container">
        <div className="heading">
          <h2></h2>
          <button className="switch-btn" onClick={this.props.switchMode}>Edit Cards →</button>
        </div>
        <div id="body">
          <div id="card-container">
            <div id="controls">
              <button id="up-btn" className="control-btn" onClick={this.cardUp}><i className="fas fa-angle-up"></i></button>
              <button id="down-btn" className="control-btn" onClick={this.cardDown}><i className="fas fa-angle-down"></i></button>
            </div>
            <div id="card" onClick={this.flipCard}>
              <div id="text-display-front" >{this.props.cards[this.state.currentCard].front}</div>
              <div id="text-display-back" >{this.props.cards[this.state.currentCard].back}</div>
            </div>
          </div>
          <div id="progress-container">
            <div>{(this.state.currentCard + 1) + ' / ' + this.props.cards.length}</div>
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