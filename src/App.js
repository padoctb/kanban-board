import React, { Component } from 'react';
import './app.css';
import Board from './components/Board/Board';

class App extends Component {
  render() {
    if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([])) // init localstorage

    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;
