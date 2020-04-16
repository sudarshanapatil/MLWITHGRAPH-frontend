import React, { Component } from 'react'
import '../App.css'
import { Modal, Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import '../styles/RateRecipe.css'
import Navbar from './Navbar'
const baseUrl = 'http://localhost:1337/'
const ratingParameter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
class RateRecipe extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      setShow: false,
      show: false,
      recipeId: '',
      rating: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value, "get")
    let searchText = (event.target.value).toLowerCase()
    this.setState({ [event.target.name]: event.target.value });
    if (searchText.length > 3) {
      let searchedData = this.state.recipes.filter((recipe) => {
        console.log(recipe.recipeName, searchText, "hii", recipe.recipeName.search(searchText))
        if (((recipe.recipeName).toLowerCase()).search(searchText) !== -1)
          return recipe
      })
      this.setState({ recipes: searchedData })
      console.log(searchedData, "search data")
    }
  }
  search = (event) => {
    console.log(event.target.value, "get")


  }
  saveRating = (recipeId, rating) => {
    console.log('in save rating ', recipeId)
    fetch(`${baseUrl}raterecipes`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipeId, rating })
    })
      .then(res => res.json())
      .then(recipes => {
        this.handleClose()
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recipes: []
        })
      })
  }

  handleClose = () => {
    console.log('in close')
    this.setState({ show: false })
  }

  handleShow = recipeId => {
    this.setState({ show: true, recipeId })
  }

  showModal = recipeId => {
    console.log('in modal', recipeId)
    this.handleShow(recipeId)
  }

  componentDidMount() {
    fetch(`${baseUrl}getallrecipes`)
      .then(res => res.json())
      .then(recipes => {
        let recipesData = recipes.map(key => {
          return key.recipeName
        })
        console.log(recipes, 'API data')
        this.setState({ recipes })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recipes: []
        })
      })
  }

  render() {
    return (
      <Container className='rateRecipeContainer' fluid>
        <Navbar />
        <Row className='rateRecipeTitle'>
          <Col>
            Rate Following Recipes And Earn POINTS!!
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter text to search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>


        </Row>


        <Row style={{
          marginTop: 30,
          alignContent: 'center',
          justifyContent: 'center',
          height: 1000,
          textAlign: 'center',
          overflowY: 'scroll'
        }}>
          {this.state.recipes.map(recipe => (
            <div className='recipeRate' onClick={() => this.showModal(recipe.id)}>
              {recipe.recipeName}
            </div>
            // <Button
            //   className='recipeRate'
            //   onClick={() => this.showModal(recipe.id)}
            // >
            //   {recipe.recipeName}
            // </Button>
          ))}
          <Modal
            show={this.state.show}
            onHide={() => this.handleClose()}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Rate Recipe:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {ratingParameter.map((rating, key) => {
                rating = rating + 1
                return <Button
                  variant='secondary'
                  onClick={() => this.saveRating(this.state.recipeId, rating)}
                >
                  {rating}
                </Button>
              })}
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant='secondary' onClick={() => this.handleClose()}>
              Close
            </Button>
            <Button variant='primary' onClick={() => this.saveRating(this.state.recipeId)}>
              Save Changes
            </Button>
          </Modal.Footer> */}
          </Modal>
        </Row>
      </Container >
    )
  }
}
export default RateRecipe
