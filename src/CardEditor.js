import logo from './logo.svg'
import React from 'react'
import './CardEditor.css'

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

  deleteCard = i => this.props.deleteCard(i)

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={index} className="row">
          <td className="front-box" >{card.front}</td>
          <td className="back-box" >{card.back}</td>
          <td className="delete-box">
            <button className="delete-btn" onClick={() => this.deleteCard(index)} ><i className="fas fa-times"></i></button>
          </td>
        </tr>
      )
    })
  
    return (
      <div class="container">
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
              <th id="front-col">Front</th>
              <th id="back-col">Back</th>
              <th id="delete-col"></th>
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
        <br/> <button onClick={this.props.switchMode}>geh</button>
      </div>
    )
  }
}

