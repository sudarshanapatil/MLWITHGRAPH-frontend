import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../styles/RecipeLevel.css';
import Navbar from './Navbar';

const baseUrl = 'https://recomsystemnode.herokuapp.com/';
class RecipesWithSkill extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      easyRecipes: [],
      difficultRecipes: []
    }
  }
  handleChange = (event) => {
    let level = event.target.value;
    if (this.state.difficultRecipes.length === 0) {
      fetch(`${baseUrl}getrecipelevel`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          skillLevel: event.target.value
        })
      })
        .then(res => res.json())
        .then(recomRecipes => {
          recomRecipes.map(recipe => {
            if (recipe.cookingTime === 0)
              recipe.cookingTime = '20 Mins'
            else {
              recipe.cookingTime = recipe.cookingTime / 60 + " Min"
            }
            return recipe;
          })
          this.setState({ difficultRecipes: recomRecipes, recipes: recomRecipes })
        })
        .catch(err => {
          this.setState({
            recomRecipes: []
          })
        })
    }
    if (level === 'Easy')
      this.setState({
        recipes: this.state.easyRecipes
      })
    else {
      this.setState({
        recipes: this.state.difficultRecipes
      })
    }
  }

  componentDidMount() {
    fetch(`${baseUrl}getrecipelevel`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        skillLevel: 'Easy'
      })
    })
      .then(res => res.json())
      .then(recomRecipes => {
        recomRecipes.map(recipe => {
          if (recipe.cookingTime === 0)
            recipe.cookingTime = '45 Min';
          else {
            recipe.cookingTime = recipe.cookingTime / 60 + " Min";
          }
          return recipe;
        })
        this.setState({ recipes: recomRecipes, easyRecipes: recomRecipes })
      })
      .catch(err => {
        this.setState({
          recomRecipes: []
        })
      })
  }
  render() {
    return (
      <Container className='recipeLevelContainer' fluid>
        <Navbar />
        <Row className='recipeLevelTitle'>
          <Col>
            Check Your Time And Prepare Recipes
          </Col>
          <Col>
            <Form.Control as="select"
              name="gender"
              onChange={this.handleChange}
            >
              <option>Choose...</option>
              <option selected>Easy</option>
              <option>More effort</option>
            </Form.Control>
          </Col>


        </Row>
        <Row className='skillLevelList'>
          <Col>
            {(this.state.recipes.length !== 0) && this.state.recipes.map(recipe => {
              return <div className='recomm-recipe-skill'>{recipe.name}
                <br />
                {recipe.cookingTime}
              </div>
            })}
          </Col>
          {/* <Col>
            {(this.state.recomRecipes.length != 0) && this.state.recomRecipes.map(recipe => {
              return <div className='recomm-recipe-skill'>{recipe.name}</div>
            })}
          </Col> */}

        </Row>
        {/* <Row> */}
        {/* <Col>Easy to prepare
          </Col> 
          <Col>
          </Col> */}
        {/* </Row> */}
      </Container>
    )
  }
}
export default RecipesWithSkill
