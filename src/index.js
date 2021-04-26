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
      ]
    }
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card)
    this.setState({ cards })
  }

  render() {
    return(
      <div>
        <CardEditor cards={this.state.cards} addCard={this.addCard} />
        <CardViewer />
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
