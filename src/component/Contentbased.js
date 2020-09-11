import React, { Component } from 'react';
import '../App.css';
import { Image, Button, Container, Row, Col } from 'react-bootstrap';

import Navbar from './Navbar';
import '../styles/Contentbased.css';
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
class Contentbased extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      recipes: [],
      selected: [],
      detailRecipe: '',
      showDetailedRecipe: false,
      recipesData: 'People who love to eat are always the best people!!'
    }
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
        .then(recipes => {
          if (recipes.length === 0) {
            this.setState({
              recipesData:
                'Sorry, No recipes available for your selected ingredients'
            })
          }
          recipes.map((recipe => {
            return recipe.recipe.replace(/[^\w\s]/gi, '');
          }))
          this.setState({ recipes })
        })
        .catch(err => {
          this.setState({
            recipes: []
          })
        })
    }
  }

  componentDidMount() {
    fetch(`${baseUrl}getallingredients`)
      .then(res => res.json())
      .then(ingredients => {
        let correctIngred = ingredients.slice(300)
        this.setState({ ingredients: correctIngred })
      })
      .catch(err => {
        this.setState({
          ingredients: []
        })
      })
  }

  moveToSelected(ingredient) {
    let selected = [...this.state.selected, ingredient].sort()
    this.getRecipe(selected)
    this.setState({
      selected
    })
  }

  removefromSelected(i) {
    let selected = this.state.selected
    selected.splice(i, 1)
    this.getRecipe(selected)
    this.setState({
      selected
    })
  }

  remainingIngredient() {
    const { selected, ingredients } = this.state
    let i = 0
    return ingredients.filter(ingredient => {
      if (ingredient === selected[i]) {
        i++
        return false
      }
      return true
    })
  }

  render() {
    return (
      <Container fluid>
        <Navbar />
        <Row className='contentbasedCotainer'>
          <Col sm={3} >
            <h4 id='ingredient-heading'>Select your ingredients</h4>
            <div id='selected-list'>
              {this.state.selected.map((selected, i) => (
                <div className='selected-ingred' key={i}>
                  {selected}
                  <span
                    className='floating-button'
                    onClick={() => this.removefromSelected(i)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              {/* </div> */}
              <div id='ingredients-list'>
                {this.remainingIngredient().map(ingredient => (
                  <div className='not-selected ingredient' key={ingredient}>
                    {ingredient}
                    <span
                      className='floating-button'
                      onClick={() => this.moveToSelected(ingredient)}
                    >
                      +
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col sm={9}>
            <Row className='titleContentbased'>
              Following are dishes which you can prepare with selected
              ingredients:
            </Row>
            <Row className='recipeList'>
              {this.state.recipes.length === 0 && (
                <p className='noDataStyle'>{this.state.recipesData}</p>
              )}
              {this.state.recipes.length !== 0 && (this.state.showDetailedRecipe === false) &&
                this.state.recipes.map(recipe => (
                  <Row className='recipe' key={recipe.id} onClick={() => this.showRecipe(recipe)}>
                    <Row className='recipeTitle'>
                      <h4>{recipe.recipe.replace(/&amp;/g,'')}</h4>
                    </Row>
                    <Row className='recipe-detail'>
                      Ingredients : {recipe.ingredients.join(', ')}
                    </Row>
                  </Row>
                ))}
              {this.state.showDetailedRecipe === true && (
                <div className='detailedView'>
                  <Row className='detailedRecipeTitle'>
                    {this.state.detailRecipe.recipe}
                  </Row>
                  <Row className='recipeImageDetailView'>
                    <Image src={require('../images/recipe3.jpg')}></Image>
                  </Row>
                  <Row className='detailedRecipeIngred'>
                    Ingredients: {this.state.detailRecipe.ingredients.join(', ')}
                  </Row>
                  <Row className='recipeStepsTitle'>
                    Steps
                </Row>
                  {steps.map((step, count) => {
                    return (<Row className='recipeStep' key={count}>
                      {`${count + 1}}`}  {step}
                    </Row>)
                  })}
                  <Row className='detailViewCloseBtn'>
                    <Button onClick={() => this.closeDetails()}>Close</Button>
                  </Row>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Contentbased
