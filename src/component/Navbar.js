import React, { Component } from 'react'
import '../App.css'
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import '../styles/Navbar.css'
function Navbar() {
  return (
    <Row className='titlebar'>
      <Col className='siteName'>
        Recipe House
          </Col>
      <Col>
        <Link to='/home'>Home</Link>
      </Col>
      <Col>
        <Link to='/content'>Based On Ingredients</Link>
      </Col>
      <Col>
        <Link to={{
          pathname: '/collaboration',
          state: {
            userName: 'Jagrutee'
          }}} > Recommendation from US</Link>
        </Col>
      <Col>
        <Link to='/rateRecipe'>Rate Recipes</Link>
      </Col>
      <Col>
        <Link to='/recipelevel'>Categorized Recipes</Link>
      </Col>
    </Row>
  )
}

export default Navbar
