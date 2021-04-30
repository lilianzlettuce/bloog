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

  componentDidMount() {
    //resize textareas
    for (let i = 0; i < this.props.cards.length; i++) {
      let f = document.querySelector('#front' + i)
      f.style.height = f.scrollHeight + "px"
      let b = document.querySelector('#back' + i)
      b.style.height = b.scrollHeight + "px"
    }
  }

  componentDidUpdate() {
    //resize textareas
    let i = this.props.cards.length - 1
    let f = document.querySelector('#front' + i)
    f.style.height = f.scrollHeight + "px"
    let b = document.querySelector('#back' + i)
    b.style.height = b.scrollHeight + "px"
  }

  addCard = () => {
    this.props.addCard(this.state)
    this.setState({front: '', back: '',})
  }

  deleteCard = i => this.props.deleteCard(i)

  //for add card inputs
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={index} className="row">
          <td className="front-box" >
            <textarea
              id={"front" + index}
              className="card-text"
              name={"front" + index}
              onChange={(e) => {
                e.target.style.height = e.target.scrollHeight + "px"
                this.props.handleChangeCard(index, e.target.value, 'front')
              }}
              value={card.front}
            />
          </td>
          <td className="back-box" >
            <textarea
              id={"back" + index}
              className="card-text"
              name={"back" + index}
              onChange={(e) => {
                //resize textarea
                e.target.style.height = e.target.scrollHeight + "px"
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
          <h2></h2>
          <button className="switch-btn" onClick={this.props.switchMode}>Study Cards →</button>
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

