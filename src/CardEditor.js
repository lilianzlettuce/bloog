import logo from './logo.svg'
import React from 'react'

export default class CardEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      front: '',
      back: '',
    }
  }

  addCard = () => {
    this.props.addCard(this.state)
    this.setState({front: '', back: '',})
  }

  deleteCard = i => {
    this.props.deleteCard(i)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td>
            <button className="delete-btn" onClick={() => this.deleteCard(index)} >X</button>
          </td>
        </tr>
      )
    })
  
    return (
      <div id="card-editor">
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br />
        <input 
          name="front"
          onChange={this.handleChange}
          placeholder="Front of card"
          value={this.state.front}
        />
        <input 
          name="back"
          onChange={this.handleChange}
          placeholder="Back of card"
          value={this.state.back}
        />
        <button className="add-btn" onClick={this.addCard} >+</button>
      </div>
    )
  }
}

