import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import './CardEditor.css'

import { Link } from 'react-router-dom'

export default class CardEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      front: '',
      back: '',
      id: this.genID(),
    }
  }

  addCard = () => {
    this.props.addCard(this.state)
    this.setState({
      front: '', 
      back: '',
      id: this.genID(),
    })
  }

  deleteCard = i => this.props.deleteCard(i)

  //for add card inputs
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  //id for map key so that cards render properly when deleted
  genID = () => {
    let id = '0'
    let dupe = true
    while (dupe === true) {
      dupe = false
      for (let i = 0; i < 10; i++) {
        let randInt = Math.floor(Math.random() * 10)
        id += randInt
      }

      //check for no repeat
      let cardIDs = this.props.cardIDs
      for (let i = 0; i < cardIDs.length; i++) {
        if (id === cardIDs[i]) {
          dupe = true
        }
      }
    }
    return id
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={card.id} className="row">
          <td className="index-box"><div className="index">{index + 1}</div></td>
          <td className="front-box" >
            <TextareaAutosize 
              cacheMeasurements
              id={"front" + index}
              className="card-text"
              name={"front" + index}
              onChange={(e) => {
                this.props.handleChangeCard(index, e.target.value, 'front')
              }}
              value={card.front}
            />
          </td>
          <td className="back-box" >
            <TextareaAutosize
              cacheMeasurements 
              id={"back" + index}
              className="card-text"
              name={"back" + index}
              onChange={(e) => {
                this.props.handleChangeCard(index, e.target.value, 'back')
              }}
              value={card.back}
            />
          </td>
          <td className="delete-box">
            <button className="delete-btn" onClick={() => this.deleteCard(index)} ><i className="fas fa-times"></i></button>
          </td>
        </tr>
      )
    })
  
    return (
      <div className="container">
        <div className="heading">
          <input 
            name="name"
            className="cardset-name"
            onChange={(e) => {
              this.props.handleChangeName(e)
            }}
            placeholder="Cardset Title"
            value={this.props.name}
          />
          <button className="switch-btn">
            <Link to="/viewer">Study Cards →</Link>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th id="front-col">Front</th>
              <th id="back-col">Back</th>
              <th id="delete-col"></th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br />
        <div id="input-container">
          <TextareaAutosize
            cacheMeasurements
            className="input"
            name="front"
            onChange={this.handleChange}
            placeholder="Front of card"
            value={this.state.front}
          />
          <TextareaAutosize
            cacheMeasurements
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

