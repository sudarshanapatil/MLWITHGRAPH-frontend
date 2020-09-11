import React, { Component } from 'react'
import '../App.css'
import '../styles/Collaborative.css'
import { Container, Row, Image, Button } from 'react-bootstrap'
import Navbar from './Navbar'
import UserContext from '../UserContext';
const baseUrl = 'https://recomsystemnode.herokuapp.com/';
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

let polularRecipes = [
  'Green tomato chutney',
  'Ultimate onion tart',
  'Vegan mug cake',
  'Green apple salad',
  'Gnocchi bolognese with spinach'
]
class Collaborative extends Component {
  constructor(props) {
    super(props)
    this.state = {
      similarUser: [],
      recipes: [],
      selected: [],
      recomRecipes: [],
      title: '',
      detailRecipe: '',
      currentUser: this.props.username,
      showDetailedRecipe: false
    }
  }

  componentDidMount() {

    let userName = this.state.currentUser
    // console.log("username did", userName,this.props.location.state.userName)
    fetch(`${baseUrl}getuserrecommendation`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName
      })
    })
      .then(res => res.json())
      .then(recomRecipes => {
        console.log(recomRecipes, 'recipeData')
        if (recomRecipes.length === 0) {
          this.setState({ recomRecipes: polularRecipes })
        }
        else
        this.setState({ recomRecipes })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recomRecipes: []
        })
      })
  }

  getRecipe(ingredients) {
    if (ingredients.length === 0) {
      this.setState({
        recipes: []
      })
    } else {
      fetch(`${baseUrl}getrecipes`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients
        })
      })
        .then(res => res.json())
        .then(recipes => this.setState({ recipes }))
        .catch(err => {
          console.log(err)
          this.setState({
            recipes: []
          })
        })
    }
  }

  showRecipe = (recipe) => {
    console.log('clicked Recipe', recipe)
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
      <Container className='collaborativeContainer' fluid>
        <Navbar />
        <Row className='sectionTitle'>Recommended Recipes For You Based On Your Simillar Users {this.props.username}!</Row>
        <Row id='recomm-recipes-list'>
          {this.state.showDetailedRecipe === false &&
            this.state.recomRecipes.map((recipe, index) => {
              return <div key={index} onClick={() => this.showRecipe(recipe)} className='recomm-recipe-each'>{recipe}</div>
            })}

          {this.state.showDetailedRecipe === true && (
            <div className='detailedView'>
              <Row className='detailedRecipeTitle'>
                {this.state.detailRecipe}
              </Row>
              <Row className='recipeImageDetailView'>
                <Image src={require('../images/recipe1.jpg')}></Image>
              </Row>
              <Row className='detailedRecipeIngred'>
                {/* Ingredients: {this.state.detailRecipe.ingredients.join(', ')} */}
              </Row>
              <Row className='recipeStepsTitle'>
                Steps
                </Row>
              {steps.map((step, count) => {
                return (<Row className='recipeStep'>
                  {`${count + 1}}`}  {step}
                </Row>)
              })}
              <Row className='detailViewCloseBtn'>
                <Button onClick={() => this.closeDetails()}>Close</Button>
              </Row>


            </div>

          )}
        </Row>
      </Container>
    )
  }
}

const withContext = () => (
  <UserContext.Consumer>
    {(contextProps) => (<Collaborative {...contextProps} />)}
  </UserContext.Consumer>
);

export default withContext;