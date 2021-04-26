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
        <h2>Card Viewer</h2>
        <br/> <button onClick={this.props.switchMode}>geh</button>
      </div>
    )
  }
}