import React, { Component } from 'react';
import Login from './component/Login';
import {
  Container
} from 'react-bootstrap';

import './App.css';
class App extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Container>
        <Login />
      </Container>
    )
  }
}

export default App
