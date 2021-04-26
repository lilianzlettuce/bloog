import React, { useState } from 'react'
import './CardViewer.css'

export default class CardViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="container">
        <div class="heading">
          <h2></h2>
          <button className="switch-btn" onClick={this.props.switchMode}>Edit Cards →</button>
        </div>
        <div id="card-container">
          <div id="card">
            <div>{this.props.cards[0].front}</div>
          </div>
          <div id="controls-container">
            <h3>Progress</h3>
          </div>
        </div>
      </div>
    )
  }
}