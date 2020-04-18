import React, { Component } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import '../styles/RecipeLevel.css'
import Navbar from './Navbar'
class RecipesWithSkill extends Component {
  constructor () {
    super()
    this.state={
      recomRecipes:[],
      easyRecipes:[],
      difficultRecipes:[]
    }
  }

  componentDidMount(){
    fetch('http://localhost:1337/getrecipelevel', {
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
        console.log(recomRecipes, 'recipeData')
        this.setState({ easyRecipes:recomRecipes })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recomRecipes: []
        })
      })
    //   fetch('http://localhost:1337/getrecipelevel', {
    //   method: 'post',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   // body: JSON.stringify({
    //   //   userName: 'Spruha'
    //   // })
    // })
    //   .then(res => res.json())
    //   .then(recomRecipes => {
    //     console.log(recomRecipes, 'recipeData')
    //     this.setState({ recomRecipes })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.setState({
    //       recomRecipes: []
    //     })
    //   })
  }
  render () {
    return (
      <Container className='recipeLevelContainer' fluid> 
      <Navbar/>
        <Row className='recipeLevelTitle'>
         Check Your Time And Prepare Recipes
        </Row>
        <Row className='skillLevelList'>
          <Col>
          {(this.state.easyRecipes.length!=0)&&this.state.easyRecipes.map(recipe => {
            return <div className='recomm-recipe-skill'>{recipe.name}
            <br/>
            {recipe.cookingTime}
            </div>
          })}
          </Col>
          <Col>
          {(this.state.recomRecipes.length!=0)&&this.state.recomRecipes.map(recipe => {
            return <div className='recomm-recipe-skill'>{recipe.name}</div>
          })} 
          </Col>
         
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
