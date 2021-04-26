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
          front: 'front1',
          back: 'back1'
        },
        {
          front: 'front2',
          back: 'back2'
        }
      ],
      editor: true,
    }
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card)
    this.setState({ cards })
  }

  deleteCard = i => {
    const cards = this.state.cards.slice()
    cards.splice(i, 1)
    this.setState({ cards })
  }

  switchMode = () => this.setState({ editor: !this.state.editor })

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
