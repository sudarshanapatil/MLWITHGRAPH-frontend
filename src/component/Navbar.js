import React, { Component } from 'react'
import '../App.css'
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
function Navbar() {
  return (
    <Container fluid>
      <Row className='titlebar'>
        <Col>
          Recipe Recommendation System
          </Col>
        <Col>
          <Link to='/home'>Home</Link>
        </Col>
        <Col>
          <Link to='/content'>Based On Ingredients</Link>
        </Col>
        <Col>
          <Link to='/collaboration'>Recommendation from US</Link>
        </Col>
        <Col>
          <Link to='/rateRecipe'>Rate Recipes</Link>
        </Col>
        <Col>
          <Link to='/recipelevel'>Categorized</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Navbar
