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

  flipCard = () => {
    if (this.state.front) {
      document.querySelector('#card').style.transform = 'rotateX(180deg)'
      setTimeout(() => {
        document.querySelector('#text-display-front').style.display = 'none'
        document.querySelector('#text-display-back').style.display = 'block'
      }, 150);
      this.setState({ front: false })
    } else {
      document.querySelector('#card').style.transform = 'rotateX(0deg)'
      setTimeout(() => {
        document.querySelector('#text-display-front').style.display = 'block'
        document.querySelector('#text-display-back').style.display = 'none'
      }, 150);
      this.setState({ front: true })
    }
  }

  cardUp = () => {
    let down = document.querySelector('#down-btn')
    down.style.color = 'var(--main)'
    down.style.cursor = 'pointer'
    if (this.state.currentCard === this.props.cards.length - 2) {
      let up = document.querySelector('#up-btn')
      up.style.color = 'var(--lighter)'
      up.style.cursor = 'auto'
    }

    if (this.state.currentCard !== this.props.cards.length - 1) {
      let card = document.querySelector('#card')
      card.style.top = '30px'
      setTimeout(() => {
        card.style.top = '0px'
      }, 200);

      this.setState({ currentCard: this.state.currentCard + 1 })
    }
  }

  cardDown = () => {
    let up = document.querySelector('#up-btn')
    up.style.color = 'var(--main)'
    up.style.cursor = 'pointer'
    if (this.state.currentCard === 1) {
      let down = document.querySelector('#down-btn')
      down.style.color = 'var(--lighter)'
      down.style.cursor = 'auto'
    }
    
    if (this.state.currentCard !== 0) {
      let card = document.querySelector('#card')
      card.style.top = '-30px'
      setTimeout(() => {
        card.style.top = '0px'
      }, 200);

      this.setState({ currentCard: this.state.currentCard - 1 })
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
          </div>
        </div>
      </div>
    )
  }
}