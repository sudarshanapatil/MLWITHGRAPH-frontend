import React, { Component } from 'react'
import '../App.css'
import {
  Nav,
  Image,
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap'
import Navbar from './Navbar'

import '../styles/Contentbased.css'
const baseUrl = 'http://localhost:1337/'
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
class AddRecipe extends Component {
  constructor () {
    super()
    this.state = {
      ingredients: [],
      recipes: [],
      selected: [],
      detailRecipe: '',
      autherName: '',
      recipeName: '',
      skillLevel: '',
      showDetailedRecipe: false,
      recipesData: 'Add your recipe!!',
      cookingTime: '',
      preparationTime: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  moveToSelected (ingredient) {
    console.log(ingredient, 'selected list')
    let selected = [...this.state.selected, ingredient].sort()
    // this.getRecipe(selected)
    this.setState({
      selected
    })
  }
  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit (event) {
    console.log(this.state)
    event.preventDefault()
  }

  componentDidMount () {
    fetch(`${baseUrl}getallingredients`)
      .then(res => res.json())
      .then(ingredients => {
        let correctIngred = ingredients.slice(5)
        this.setState({ ingredients: correctIngred })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          ingredients: []
        })
      })
  }

  addRecipe () {
    console.log(this.state, 'state')
    let {
      selected,
      recipeName,
      autherName,
      skillLevel,
      cookingTime,
      preparationTime,
      description
    } = this.state
    let data = {
      selected,
      recipeName,
      autherName,
      skillLevel,
      cookingTime,
      preparationTime,
      description
    }
    console.log(data, 'ghghghg')
    fetch(`${baseUrl}addrecipe`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(ingredients => {
        // let correctIngred = ingredients.slice(5)
        // this.setState({ ingredients: correctIngred })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          ingredients: []
        })
      })
  }

  remainingIngredient () {
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

  render () {
    return (
      <Container fluid>
        <Navbar />
        <Row className='contentbasedCotainer'>
          <Col sm={3}>
            <h4 id='ingredient-heading'>Select your ingredients</h4>
            <div id='selected-list'>
              {this.state.selected.map((selected, i) => (
                <div class=''>
                  {selected}
                  <span
                    class='floating-button'
                    onClick={() => this.removefromSelected(i)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              {/* </div> */}
              <div id='ingredients-list'>
                {this.remainingIngredient().map(ingredient => (
                  <div class='not-selected ingredient'>
                    {ingredient}
                    <span
                      class='floating-button'
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
            <Row className='titleContentbased'>Add Recipe</Row>
            <Row>
              <Form>
                <Form.Group as={Row} controlId='formPlaintextPassword'>
                  <Form.Label column sm='2'>
                    Recipe Name
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='input'
                      placeholder='Recipe Name'
                      name='recipeName'
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formPlaintextPassword'>
                  <Form.Label column sm='2'>
                    Auther Name
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='input'
                      placeholder='Auther name'
                      name='autherName'
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintextPassword'>
                  <Form.Label column sm='2'>
                    Skill Level
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='input'
                      placeholder='Skill Level'
                      name='skillLevel'
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintextPassword'>
                  <Form.Label column sm='2'>
                    Preparation Time
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='input'
                      placeholder='Preparation Time'
                      name='preparationTime'
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintextPassword'>
                  <Form.Label column sm='2'>
                    Cooking Time
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='input'
                      placeholder='Cooking Time'
                      name='cookingTime'
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintextPassword'>
                  <Form.Label column sm='2'>
                    Description
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='input'
                      placeholder='Description'
                      name='description'
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Row>
            <Row className='detailViewCloseBtn'>
              <Button onClick={() => this.addRecipe()}>Add Recipe</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default AddRecipe
