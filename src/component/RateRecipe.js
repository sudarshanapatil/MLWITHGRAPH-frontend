import React, { Component } from 'react'
import '../App.css'
import { Modal, Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import '../styles/RateRecipe.css'
import Navbar from './Navbar'
import UserContext from '../UserContext';
const baseUrl = 'https://recomsystemnode.herokuapp.com/';

const ratingParameter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class RateRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      setShow: false,
      show: false,
      recipeId: '',
      rating: '',
      searchText: '',
      searchCount: 0,
      detailRecipe: '',
      showDetailedRecipe: false,
      currentUser: this.props.username
    }
  }

  handleChange = (event) => {
    let searchText = (event.target.value).toLowerCase()
    if (searchText.length === 0 || searchText === '') {
      this.setState({ recipes: this.state.apiData, searchCount: 0 })
    }
    if (searchText.length > 3) {
      let searchedData = this.searchData(this.state.apiData, searchText)
      this.setState({
        recipes: searchedData,
        searchText,
        searchCount: searchedData.length,
      })
    }
  }

  searchData = (recipes, searchText) => {
    return recipes.filter((recipe) => {
      let recipeName = recipe.recipeName;
      return recipeName.toLowerCase().search(searchText) !== -1;
    })
  }

  search = (event) => {
  }

  saveRating = (recipeId, rating) => {
    fetch(`${baseUrl}raterecipes`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipeId, rating, user: this.state.currentUser })
    })
      .then(res => res.json())
      .then(recipes => {
        this.handleClose()
      })
      .catch(err => {
        this.setState({
          recipes: []
        })
      })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = recipeId => {
    this.setState({ show: true, recipeId })
  }

  showModal = recipeId => {
    this.handleShow(recipeId)
  }

  componentDidMount() {
    fetch(`${baseUrl}getallrecipes`)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes, apiData: recipes })
      })
      .catch(err => {
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
            <InputGroup className="searchBox">
              <FormControl
                placeholder="Enter recipe to search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
              <Button>Search</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className='recipeDiv'>
          {/* {(this.state.searchCount > 0) && <Row className='searchTitle'>
            {`${this.state.searchText} Recipes ${this.state.searchCount}`}
          </Row>
          } */}
          {this.state.recipes.map(recipe => (
            <div className='recipeRate' key={recipe.id} onClick={() => this.showModal(recipe.id)}>
              {recipe.recipeName.replace(/&amp;/g,'')}
            </div>

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
                return <Button
                  variant='secondary'
                  key={key}
                  onClick={() => this.saveRating(this.state.recipeId, rating)}
                >
                  {rating}
                </Button>
              })}
            </Modal.Body>
          </Modal>
        </Row>
      </Container >
    )
  }
}

const withContext = () => (
  <UserContext.Consumer>
    {(contextProps) => (<RateRecipe {...contextProps} />)}
  </UserContext.Consumer>
);

export default withContext;