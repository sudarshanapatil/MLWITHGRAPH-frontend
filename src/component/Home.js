import React, { Component } from 'react'
import {
  FormControl,
  InputGroup,
  Carousel,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css'
import '../styles/Home.css'
import Navbar from './Navbar'
class Home extends Component {
  constructor() {
    super()
    this.state = {
      render: ''
    }
  }

  render() {
    console.log(this.state.render)
    return (
      // <div className='backgroundImage'></div>
      <Container className='homeContainer' fluid>
<Navbar />
        {/* <Row className='titlebar'>
          <Col>
          Recipe Recommendation System
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
         
         
          </Row> */}
          <Row className='searchContainer'>
            <Col></Col>
            <Col>
            <InputGroup className="findRecipe">
              <FormControl
                placeholder="Recipe name..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
            </InputGroup>
            </Col>
            <Col className='findRecipeText'>
            search Recipes
            </Col>
            <Col>
            </Col>
          
          </Row>
        {/* <Row className='navContainer'>
          <Col className='home-button-each'>
            <Row className='navchoices'>
              <Link to='/content'>Find Recipes Based On Ingredients</Link>
            </Row>
            <Row className='navchoices'>
              <Link to='/collaboration'>
                Recommended Recipes For You From Us!!
            </Link>
            </Row>
          </Col>
          <Col className='home-button-each'>
            <Row className='navchoices'>
              <Link to='/recipelevel'>Recipes with different Skills</Link>

            </Row>
            <Row className='navchoices'>
              <Link to='/rateRecipe'>Rate Racipe</Link>
            </Row>

          </Col>
        </Row> */}
        <Row className='home-caroulsel'>
          <Carousel>
            <Carousel.Item>
              <img
                className='img-carousel'
                src={require('../images/carousel3.jpg')}
                alt='First slide'
              />
              <Carousel.Caption>
                <h3>John Gunther</h3>
                <p>
                  All happiness depends on a leisurely breakfast
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='img-carousel'
                src={require('../images/carousel2.jpg')}
                alt='First slide'
              />
              <Carousel.Caption>
                <h3>Paul Prudhomme</h3>
                <p>
                  You don't need a silver fork to eat good food.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='img-carousel'
                src={require('../images/indianchat.jpg')}
                alt='Third slide'
              />
              <Carousel.Caption>
                <h3>Barbara Johnson</h3>
                <p>A balanced diet is a cookie in each hand.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          {this.state.render}
        </Row>
      </Container>
    )
  }
}

export default Home
