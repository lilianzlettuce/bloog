import logo from './logo.svg'
import React, { useState } from 'react'

export default function CardEditor(props) {
  let [front, setFront] = useState('')
  let [back, setBack] = useState('')

  const handleChange = e => {
    setFront(e.target.value)
  }

  let cards = props.cards.map((card, index) => {
    return (
      <tr>
        <td>{card.front}</td>
        <td>{card.back}</td>
        <td>
          <button className="delete-btn" >X</button>
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
        <tbody>
          {cards}
        </tbody>
      </table>
      <br />
      <input 
        name="front"
        onChange={(e) => {setFront(e.target.value)}}
        placeholder="Front of card"
        value={front}
      />
      <input 
        name="back"
        onChange={(e) => {setBack(e.target.value)}}
        placeholder="Back of card"
        value={back}
      />
      <button className="add-btn" >+</button>
    </div>
  )
}

