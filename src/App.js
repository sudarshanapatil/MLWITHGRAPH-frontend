import React, { Component } from 'react';
// import Login from './component/Login';
import Home from './component/Home';
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
        <Home />
      </Container>
    )
  }
}

export default App
