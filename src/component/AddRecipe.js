import React, { Component } from 'react'
import '../App.css'
import '../styles/AddRecipe.css'
import {
  Nav,
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap'
import Navbar from './Navbar'

import '../styles/Contentbased.css'
const baseUrl = 'http://localhost:1337/'
let formData = [
  {
    title: 'Recipe Name',
    name: 'recipeName'
  },
  {
    title: 'Auther Name',
    name: 'autherName'
  },
  {
    title: 'Description',
    name: 'description',
    as: 'textarea'
  },
  {
    title: 'Cooking Time',
    name: 'cookingTime'
  },
  {
    title: 'Preparation Time',
    name: 'preparationTime'
  },

  {
    title: 'Skill Level',
    name: 'skillLevel',
    as: 'select',
    option: ['Easy', 'More Efforts'],

  },
  {
    title: 'Procedure',
    name: 'procedure',
    button: 'add'
  }

]
class AddRecipe extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      recipes: [],
      selected: [],
      detailRecipe: '',
      autherName: '',
      recipeName: '',
      skillLevel: '',
      procedure: [],
      recipeStep: '',
      showDetailedRecipe: false,
      recipesData: 'Add your recipe!!',
      cookingTime: '',
      preparationTime: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  moveToSelected(ingredient) {
    console.log(ingredient, 'selected list')
    let selected = [...this.state.selected, ingredient].sort()
    // this.getRecipe(selected)
    this.setState({
      selected
    })
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault()
  }

  componentDidMount() {
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
  addProcedure() {
    // console.log("add procedure",this.state.procedure,this.state.recipeStep)

    console.log("add procedure", this.state.procedure, this.state.recipeStep)
    this.state.procedure.push(this.state.recipeStep)
    this.setState({ procedure: this.state.procedure, recipeStep: '' })
  }

  addRecipe() {
    console.log(this.state, 'state')
    let {
      selected,
      recipeName,
      autherName,
      skillLevel,
      cookingTime,
      preparationTime,
      description,
      procedure
    } = this.state
    let data = {
      selected,
      recipeName,
      autherName,
      skillLevel,
      cookingTime,
      preparationTime,
      description,
      procedure
    }
    fetch(`${baseUrl}addrecipe`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then( ()=> {})
      .catch(err => {
        console.log(err)
        this.setState({
          ingredients: []
        })
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
            <Row className='addRecipeForm'>
              {formData.map(data => {
                return (
                  <div>
                    {(!data.button) && <Form.Group as={Row} >
                      <Form.Label column sm='2'>
                        {data.title}
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control as={data.as}
                          className='formValues'
                          type='input'
                          placeholder={data.title}
                          name={data.name}
                          onChange={this.handleChange}
                        >
                          {(data.option) && (data.option.map((item) => {
                            return (<option>{item}</option>)
                          }))}
                        </Form.Control>
                      </Col> </Form.Group>
                    }

                    {
                      (data.button) && (<Form.Group as={Row} >
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Describe recipe step"
                            name='recipeStep'
                            onChange={this.handleChange}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          />
                          <InputGroup.Append>
                            <Button variant="outline-secondary"

                              onClick={() => this.addProcedure()}>Add Step</Button>
                          </InputGroup.Append>
                        </InputGroup></Form.Group>)

                    }

                  </div>
                )
              })}
              <Row>{

                (this.state.procedure.length > 0) &&
                <Row className='showRecipeSteps'>
                  {(this.state.procedure.map((step, index) => {
                    return (<Row>
                      {index + 1}. {step}
                    </Row>)
                  }))}
                </Row>
              }
              </Row>
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


