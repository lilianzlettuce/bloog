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
          <td className="front-box" >
            <div
              class="card-text"
              role="textbox"
              contentEditable
              name={"front" + index}
              onChange={(e) => this.props.handleChangeCard(index, e.target.textContent, 'front')}
            >
              {card.front}
            </div>
          </td>
          <td className="back-box" >
            <div
              class="card-text"
              role="textbox"
              contentEditable
              name={"back" + index}
              onChange={(e) => this.props.handleChangeCard(index, e.target.textContent, 'back')}
            > 
              {card.back}
            </div>
          </td>
          <td className="delete-box">
            <button className="delete-btn" onClick={() => this.deleteCard(index)} ><i className="fas fa-times"></i></button>
          </td>
        </tr>
      )
    })
  
    return (
      <div class="container">
        <div class="heading">
          <h2></h2>
          <button class="switch-btn" onClick={this.props.switchMode}>Study Cards →</button>
        </div>
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
        <div id="input-container">
          <input 
            className="input"
            name="front"
            onChange={this.handleChange}
            placeholder="Front of card"
            value={this.state.front}
          />
          <input 
            className="input"
            name="back"
            onChange={this.handleChange}
            placeholder="Back of card"
            value={this.state.back}
          />
          <button className="add-btn" onClick={this.addCard} ><i className="fas fa-plus"></i></button>
        </div>
      </div>
    )
  }
}

