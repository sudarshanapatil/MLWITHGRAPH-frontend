import React, { Component } from 'react'
import {
  FormControl,
  InputGroup,
  Carousel,
  Container,
  Row,
  Col, Image, Button
} from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import '../App.css'
import '../styles/Home.css'
import Navbar from './Navbar'
let steps = [
  'Take a pan and add butter in it',
  'After the butter is melted add All purpose flour and roast it till it is pinkish coloured',
  'Now add warm milk',
  'Now quickly mix it well so that pieces are not created',
  'Now add sugar,salt and black pepper',
  'Mix it well',
  'Now add fresh cream and 1cup cheese in it. Mix it well',
  'Now white sauce is ready add pasta in it. Mix it well'
]
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
const baseUrl = 'https://recomsystemnode.herokuapp.com/';
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: '',
      currentUser: this.props.location.state !== undefined ? this.props.location.state.userName : "Sudarshana",
      apiData: false,
      recipes: [],
      searchedData: [],
      showCarousel: true,
      searchText: '',
      searchCount: 0,
      detailRecipe: '',
      showDetailedRecipe: false,
    }
    if (this.props.location.state) {
      // let userName = this.props.location.state.userName
    }
  }
  handleChange = (event) => {
    let searchText = (event.target.value).toLowerCase();
    if (searchText.length === 0 || searchText === '') {
      this.setState({ showCarousel: true, searchText })
    }
    if (searchText.length > 3 && !this.state.apiData) {
      fetch(`${baseUrl}getallrecipes`)
        .then(res => res.json())
        .then(recipes => {
          let searchedData = this.searchData(recipes, searchText)
          this.setState({
            apiData: true,
            recipes,
            showCarousel: false,
            searchText,
            searchCount: searchedData.length,
            searchedData,

          })
        })
        .catch(err => {
          this.setState({
            recipes: []
          })
        })
    }
    if (this.state.apiData && searchText !== '' && searchText.length > 3) {
      let searchedData = this.searchData(this.state.recipes, searchText)
      let searchCount = searchedData.length
      this.setState({ searchCount, searchText, searchedData, showCarousel: false, })
    }
  }

  searchData = (recipes, searchText) => {
    return recipes.filter((recipe) => {
      let recipeName = recipe.recipeName;
      return recipeName.toLowerCase().search(searchText) !== -1;
    })
  }
  showRecipe = (recipe) => {
    this.setState({
      showDetailedRecipe: true,
      detailRecipe: recipe
    })
  }
  closeDetails = () => {
    this.setState({
      showDetailedRecipe: false
    })
  }
  render() {
    return (
      // <div className='backgroundImage'></div>
      <Container className='homeContainer' fluid>
        <Navbar userName={this.state.currentUser} />
        <Row className='searchContainer'>
          <Col></Col>
          <Col>
            <InputGroup className="findRecipe">
              <FormControl
                placeholder="I WANT TO MAKE ..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
          <Col className='findRecipeText'>
            Search Recipes
            </Col>
          <Col>
          </Col>
        </Row>
        {this.state.showCarousel && <Row className='home-caroulsel'>
          <Carousel>
            {carouselData.map((data, index) => {
              return <Carousel.Item key={index}>
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
        {!this.state.showCarousel && !this.state.showDetailedRecipe &&
          <Row className='searchedData'>
            <Row className='searchTitle'>
              {`"${this.state.searchText}" Recipes - ${this.state.searchCount}`}
            </Row>

            {this.state.searchedData.map((recipe, key) => {
              return (
                <Row className='searchedRecipe' key={key + recipe} onClick={() => this.showRecipe(recipe)}>
                  {recipe.recipeName.replace(/&amp;/g,'')}
                </Row>
              )
            })}
          </Row>
        }
        {
          this.state.showDetailedRecipe && (
            <div className='detailedView'>
              <Row className='detailedRecipeTitle'>
                {`"${this.state.detailRecipe.recipeName.replace(/&amp;/g,'')}"`}
              </Row>
              <Row>
                <Image src={require('../images/recipe1.jpg')}></Image>
              </Row>
              <Row className='detailedRecipeIngred'>
                ingredients: {this.state.detailRecipe.ingredients.join(', ')}
              </Row>
              <Row>
                Steps
                </Row>
              {steps.map((step, count) => {
                return (<Row className='recipeStep' key={count}>
                  {`${count + 1}}`}  {step}
                </Row>)
              })}
              <Row>
                <Button onClick={() => this.closeDetails()}>Close</Button>
              </Row>
            </div>
          )}
      </Container>
    )
  }
}

export default Home
