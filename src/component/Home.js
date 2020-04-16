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
const carouselData = [
  {
    image: require('../images/carousel2.jpg'),
    auther: 'Paul Prudhomme',
    caption: `You don't need a silver fork to eat good food.`,
    alt: 'enjoy food'
  },
  {
    image: require('../images/carousel3.jpg'),
    auther: 'John Gunther',
    caption: ' All happiness depends on a leisurely breakfast',
    alt: ''
  },
  {
    image: require('../images/indianchat.jpg'),
    auther: 'Barbara Johnson',
    caption: 'A balanced diet is a cookie in each hand.',
    alt: ''
  }
]
class Home extends Component {
  constructor() {
    super()
    this.state = {
      render: '',
      apiData: false,
      recipes: [],
      searchedData: [],
      showCarousel: true,
      searchText: '',
      searchCount: 0
    }
  }
  handleChange = (event) => {
    console.log(event.target.value, "get")
    let searchText = (event.target.value).toLowerCase()
    // this.setState({ [event.target.name]: event.target.value });
    if (searchText.length === 0 || searchText === '') {
      this.setState({ showCarousel: true, searchText })
    }
    if (searchText.length > 3 && !this.state.apiData) {
      console.log('calling API', this.state.apiData)
      fetch('http://localhost:1337/getallrecipes')
        .then(res => res.json())
        .then(recipes => {
          console.log(recipes.length, "apidata length")
          this.setState({
            apiData: true,
            recipes,
            showCarousel: false,
            searchText
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            recipes: []
          })
        })


    }
    if (this.state.apiData && searchText !== '') {
      let searchedData = this.state.recipes.filter((recipe) => {
        if (((recipe.recipeName).toLowerCase()).search(searchText) !== -1)
          return recipe
      })
      this.setState({
        searchedData,
        showCarousel: false,
        searchText,
        count: searchedData.length
      })
      console.log(searchedData.length, "search data", searchedData[0], searchText)

    }

  }
  render() {
    return (
      // <div className='backgroundImage'></div>
      <Container className='homeContainer' fluid>
        <Navbar />
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
        {this.state.showCarousel && <Row className='home-caroulsel'>
          <Carousel>
            {carouselData.map((data, index) => {
              return <Carousel.Item>
                <img
                  className='img-carousel'
                  src={data.image}
                  alt={data.alt}
                />
                <Carousel.Caption>
                  <h3>{data.auther}</h3>
                  <p>
                    {data.caption}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            })}
          </Carousel>
        </Row>}


        {!this.state.showCarousel &&
          <Row className='searchedData'>
            <Row className='searchedRecipe'>
              {this.state.searchText} Recipes {this.state.searchCount}
            </Row>

            {this.state.searchedData.map((recipe, key) => {
              return (
                <Row className='searchedRecipe' key={key}>
                  {recipe.recipeName}
                </Row>
              )
            })}
          </Row>
        }
      </Container>
    )
  }
}

export default Home
