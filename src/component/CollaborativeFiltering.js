import React, { Component } from 'react'
import '../App.css'
import '../styles/Collaborative.css'
import { Container, Row } from 'react-bootstrap'
import Navbar from './Navbar'
import UserContext from '../UserContext';
const baseUrl = 'http://localhost:1337/'

class Collaborative extends Component {
  constructor(props) {
    super(props)
    this.state = {
      similarUser: [],
      recipes: [],
      selected: [],
      recomRecipes: [],
      title: '',
      currentUser: this.props.username
    }
  }

  componentDidMount() {

    let userName = this.state.currentUser
    console.log("username did", userName,this.props.location.state.userName)
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

  getSimilarUser(userName) {
    this.setState({ currentUser: userName })
    fetch(`${baseUrl}getsimilaruser`, {
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
      .then(similarUser => {
        console.log(similarUser, 'similarUser')
        this.getRecom(userName, similarUser)
        // fetch(`${baseUrl}getuserrating`, {
        //   method: 'post',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     userName
        //   })
        // }).then(res => {
        //   console.log('res: ', res)
        // })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recomRecipes: []
        })
      })
  }

  getRecom(userName, similarUser) {
    fetch(`${baseUrl}getuserrecommendation`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'Spruha'
      })
    })
      .then(res => res.json())
      .then(recomRecipes => {
        console.log(recomRecipes, 'recipeData')
        this.setState({ recomRecipes, similarUser })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recomRecipes: []
        })
      })
  }

  render() {
    return (
      <Container className='collaborativeContainer' fluid>
        <Navbar />
        <Row className='sectionTitle'>Recommended Recipes For You Based On Your Simillar Users {this.state.currentUser}!</Row>
        <Row id='recomm-recipes-list'>
          {this.state.recomRecipes.map(recipe => {
            return <div className='recomm-recipe-each'>{recipe}</div>
          })}
        </Row>
      </Container>
    )
  }
}

const withContext = () => (
  <UserContext.Consumer>
    { (contextProps) => (<Collaborative {...contextProps}/>)}
  </UserContext.Consumer>
);

export default withContext;