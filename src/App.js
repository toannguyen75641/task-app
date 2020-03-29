import React, { Component } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import Task from './Task/Task';
import User from './User/User';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>React Tutorial</h1>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/tasks">Tasks</Link>
                  </li>
                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </nav>
              <Switch>
                <Route path="/tasks">
                  <Task></Task>
                </Route>
                <Route path="/users">
                  <User></User>
                </Route>
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;