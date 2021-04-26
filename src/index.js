import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [
        {
          front: 'BLOOG',
          back: 'bald lion orders orange ghicken'
        },
        {
          front: 'YOU THERE (○｀д´)ﾉｼ STOP ',
          back: 'ooo====================Σ(っﾟДﾟ)っ !'
        },
        {
          front: '1 + 1',
          back: '11'
        },
        {
          front: 'curry chicken',
          back: 'yum'
        },
        {
          front: 'yet another',
          back: 'example'
        },
      ],
      editor: false,
    }
  }

  addCard = card => {
    const front = card.front.trim()
    const back = card.back.trim()
    if (front !== '' && back !== '') {
      const cards = this.state.cards.slice().concat(card)
      this.setState({ cards })
    } else {
      alert('Please fill in blank card.')
    }
  }

  deleteCard = i => {
    const cards = this.state.cards.slice()
    cards.splice(i, 1)
    this.setState({ cards })
  }

  switchMode = () => {
    if (this.state.cards.length > 0) {
      this.setState({ editor: !this.state.editor })
    } else {
      alert('Card set cannot be empty!')
    }
  }

  render() {
    if (this.state.editor) {
      return(
        <CardEditor 
          cards={this.state.cards} 
          addCard={this.addCard} 
          deleteCard={this.deleteCard} 
          switchMode={this.switchMode}
        />
      )
    } else {
      return(
        <CardViewer 
          cards={this.state.cards} 
          switchMode={this.switchMode}
        />
      )
    }
  }
}

ReactDOM.render(
  <Main />,
  document.querySelector('#root')
);
