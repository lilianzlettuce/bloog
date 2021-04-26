import React, { useState } from 'react'

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
          <h2>Card Viewer</h2>
          <button className="switch-btn" onClick={this.props.switchMode}>Edit Cards →</button>
        </div>
      </div>
    )
  }
}