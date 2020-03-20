import React, { Component } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import Task from './Task/Task';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>React Tutorial</h1>
            <Task></Task>
        </Container>
      </div>
    );
  }
}

export default App;