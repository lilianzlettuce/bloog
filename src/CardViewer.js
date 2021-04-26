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

  flipCard = e => {
    if (this.state.front) {
      e.target.style.transform = 'rotateX(180deg)'
      let text = document.querySelector('#text-display')
      text.textContent = this.props.cards[this.state.currentCard].back
      this.setState({ front: false })
    } else {
      e.target.style.transform = 'rotateX(0deg)'
      this.setState({ front: true })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="heading">
          <h2></h2>
          <button className="switch-btn" onClick={this.props.switchMode}>Edit Cards →</button>
        </div>
        <div id="card-container">
          <div id="card" onClick={this.flipCard}>
            <div id="text-display-front" >{this.props.cards[this.state.currentCard].front}</div>
            <div id="text-display-back" >{this.props.cards[this.state.currentCard].back}</div>
          </div>
          <div id="controls-container">
            <h3>Progress</h3>
          </div>
        </div>
      </div>
    )
  }
}