import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class Main extends React.Component() {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <CardEditor />
        <CardViewer />
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
