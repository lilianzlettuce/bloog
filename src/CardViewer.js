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
              <button id="up-btn" className="control-btn"><i className="fas fa-angle-up"></i></button>
              <button id="down-btn" className="control-btn"><i className="fas fa-angle-down"></i></button>
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