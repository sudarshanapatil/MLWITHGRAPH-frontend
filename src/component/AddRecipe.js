import React, { Component } from 'react'
import '../App.css'
import '../styles/AddRecipe.css';

import UserContext from '../UserContext';
import {
  Table,
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
  Modal
} from 'react-bootstrap'
import Navbar from './Navbar'

import '../styles/Contentbased.css'
const baseUrl = 'http://localhost:1337/'
let formData = [
  {
    title: 'Recipe Name',
    name: 'recipeName'
  },
  // {
  //   title: 'Author Name',
  //   name: 'authorName'
  // },
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
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      recipes: [],
      selected: [],
      detailRecipe: '',
      authorName: '',
      recipeName: '',
      skillLevel: 'Easy',
      procedure: [],
      recipeStep: '',
      showDetailedRecipe: false,
      recipesData: 'Add your recipe!!',
      cookingTime: '',
      preparationTime: '',
      description: '',
      showAlert: false,
      authorRecipes: [],
      alertHeading: '',
      alertMessage: '',
      currentUser: this.props.username
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
    console.log("current user",this.state.currentUser)
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
    fetch(`${baseUrl}getwrittenrecipe`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorName: this.state.currentUser })
    })
      .then(res => res.json())
      .then(recipes => {
        this.setState({ authorRecipes: recipes })
        console.log(this.state.authorRecipes)
      })
      .catch(err => {
        console.log(err)
        this.setState({
          ingredients: []
        })
      })

  }
  addProcedure() {
    console.log("add procedure", this.state.procedure, this.state.recipeStep)
    this.state.procedure.push(this.state.recipeStep)
    this.setState({ procedure: this.state.procedure, recipeStep: '' })
  }

  addRecipe() {
    console.log(this.state, 'state')
    let {
      selected,
      recipeName,
      currentUser,
      skillLevel,
      cookingTime,
      preparationTime,
      description,
      procedure
    } = this.state

    let authorName;
    let data = {
      selected,
      recipeName,
      authorName:currentUser,
      skillLevel,
      cookingTime,
      preparationTime,
      description,
      procedure
    }

    if (selected.length === 0 || recipeName === "" ||
      authorName === "" ||
      skillLevel === "" ||
      cookingTime === "" ||
      preparationTime === "" ||
      description === "" ||
      procedure === []) {
      console.log("in if")
      this.setState({
        showAlert: true,
        alertMessage: 'Please fill all the details',
        alertHeading: 'Error in saving details'
      })
    }

    fetch(`${baseUrl}addrecipe`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          showAlert: true,
          alertMessage: 'Successfully saved your recipe!',
          alertHeading: 'Success!'
        })
        console.log(res, "API Response")
      })
      .catch(err => {
        console.log(err)
        this.setState({
          ingredients: []
        })
      })

  }
  handleClose = () => {
    console.log("in close")
    this.setState({
      showAlert: false
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
        {this.state.showAlert &&
          <Modal show={true} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.alertHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.alertMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Ok
            </Button>

            </Modal.Footer>
          </Modal>

        }
        <Row className='contentbasedCotainer'>
          <Col sm={3}>
            <h4 id='ingredient-heading'>Select your ingredients</h4>
            <div id='selected-list'>
              {this.state.selected.map((selected, i) => (
                <div className=''>
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
                  <div className='not-selected ingredient'>
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
            <Row className='titleContentbased'>Add Recipe</Row>
            <Row>
              <Col sm={6} className='addRecipeForm'>
                {formData.map(data => {
                  return (
                    <div>
                      {(!data.button) && (!data.option) && <Form.Group as={Row} >
                        <Form.Label column sm='3'>
                          {data.title}
                        </Form.Label>
                        <Col sm='6'>
                          <Form.Control as={data.as}
                            className='formValues'
                            type='input'
                            placeholder={data.title}
                            name={data.name}
                            onChange={this.handleChange}
                          >
                          </Form.Control>
                        </Col> </Form.Group>
                      }
                    </div>
                  )
                })}

              </Col>
              <Col sm={3}>
                {formData.map(data => {
                  return (<div>
                    {(data.option) && <Form.Group as={Row} >
                      <Form.Label column sm='3'>
                        {data.title}
                      </Form.Label>
                      <Col sm='6'>
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

                  </div>)
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
                <Row className='detailViewCloseBtn'>
                  <Button onClick={() => this.addRecipe()}>Add Recipe</Button>
                </Row>
              </Col>

            </Row>
            <Row>
              {
                this.state.authorRecipes.length > 0 &&
                (<Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Recipe Name</th>
                      <th>Description</th>
                      <th>skill Level</th>
                      <th>Preparation Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.authorRecipes.map((item =>
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.skillLevel}</td>
                        <td>{item.preparationTime.low}</td>
                      </tr>))}
                  </tbody>
                </Table>)
              }

            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const withContext = () => (
  <UserContext.Consumer>
    { (contextProps) => (<AddRecipe {...contextProps}/>)}
  </UserContext.Consumer>
);

export default withContext;
// export default AddRecipe




