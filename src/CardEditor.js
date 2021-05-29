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
      id: 99,
      cardIDs: [],
      name: 'My Awesome Card Set',
      cards: [
        {
          front: 'BLOOG',
          back: 'bob loves oily orange geese',
          id: '0',
        },
        {
          front: 'YOU THERE (○｀д´)ﾉｼ STOP ',
          back: 'ooo=============Σ(っﾟДﾟ)っ !',
          id: '1',
        },
        {
          front: '1 + 1',
          back: '11',
          id: '2',
        },
        {
          front: 'curry chicken',
          back: 'yum',
          id: '3',
        },
        {
          front: 'yet another',
          back: 'curry chicken',
          id: '4',
        },
        {
          front: 'sem malesuada. Sed nec auctor libero. Aliquam non dignissim ante. Morbi condi',
          back: 'met, consectetur adipiscing elit. Etiam gravida laoreet varius. Donec iaculis erat vel ligula vestibulum, in sagittis ',
          id: '5',
        },
        {
          front: 'deep within your heart there lies... ',
          back: '...a sandwich with only bread.',
          id: '6',
        },
        {
          front: 'dog',
          back: 'donde esta la biblioteca',
          id: '7',
        },
        {
          front: '*beep*',
          back: 'You have mail!',
          id: '8',
        },
      ],
    }
  }

  addCard = () => {
    const newCard = {
      front: this.state.front,
      back: this.state.back,
      id: this.state.id,
    }
    const cards = this.state.cards.slice().concat(newCard)
    this.setState({ 
      front: '', 
      back: '',
      id: this.genID(),
      cardIDs: this.state.cardIDs.slice().concat(this.state.id),
      name: this.state.name,
      cards,
    })
  }

  deleteCard = i => {
    if (this.state.cards.length > 1) {
      const cards = this.state.cards.slice()
      cards.splice(i, 1)
      this.setState({ cards })
    } else {
      alert('Card set cannot be empty!')
    }
  }

  //for add card and name inputs
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
      let cardIDs = this.state.cardIDs
      for (let i = 0; i < cardIDs.length; i++) {
        if (id === cardIDs[i]) {
          dupe = true
        }
      }
    }
    return id
  }

  //edit existing card
  handleChangeCard = (i, val, side) => {
    let half1 = this.state.cards.slice(0, i)
    let half2 = this.state.cards.slice(i + 1)

    let newCard
    if (side === 'front') {
      newCard = {
        front: val,
        back: this.state.cards[i].back,
        id: this.state.cards[i].id,
      }
    } else {
      newCard = {
        front: this.state.cards[i].front,
        back: val,
        id: this.state.cards[i].id,
      }
    }

    this.setState({ cards: half1.concat(newCard).concat(half2) })
  }

  render() {
    const cards = this.state.cards.map((card, index) => {
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
                this.handleChangeCard(index, e.target.value, 'front')
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
                this.handleChangeCard(index, e.target.value, 'back')
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
              this.handleChange(e)
            }}
            placeholder="Cardset Title"
            value={this.state.name}
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

