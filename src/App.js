import React, { Component } from 'react'
import Login from './component/Login'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {
  Button,
  ButtonToolbar,
  Container,
  Row,
  Carousel,
  Col
} from 'react-bootstrap'
import './App.css'
class App extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <Container>
            <Login />        
      </Container>
    )
  }
}

export default App
