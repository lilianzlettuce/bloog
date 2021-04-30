import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'My Awesome Card Set',
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
          front: 'your favorite food',
          back: 'a sandwich with only bread',
          id: '6',
        },
        {
          front: 'asistir',
          back: 'Lorem ipsum dolor sit aleifend turpis ac viverra. Vivamus et justo nec lacu',
          id: '7',
        },
        {
          front: '*beep*',
          back: 'You have mail!',
          id: '8',
        },
      ],
      editor: true,
      cardIDs: [],
    }
  }

  handleChangeTitle = e => {
    this.setState({ [e.target.name]: e.target.value })
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
      }
    } else {
      newCard = {
        front: this.state.cards[i].front,
        back: val,
      }
    }

    this.setState({ cards: half1.concat(newCard).concat(half2) })
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card)
    this.setState({ 
      cards,
      cardIDs: this.state.cardIDs.concat(card.id)
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

  switchMode = () => {
    if (this.state.editor === false) {
      document.body.style.overflow = 'scroll'
      this.setState({ editor: true })
    } else {
      document.body.style.overflow = 'hidden'
      document.documentElement.scrollTop = 0;
      this.setState({ editor: false })
    }
  }

  render() {
    if (this.state.editor) {
      return(
        <CardEditor 
          title={this.state.title}
          cards={this.state.cards} 
          cardIDs={this.state.cardIDs}
          addCard={this.addCard} 
          deleteCard={this.deleteCard} 
          switchMode={this.switchMode}
          handleChangeTitle={this.handleChangeTitle}
          handleChangeCard={this.handleChangeCard}
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
