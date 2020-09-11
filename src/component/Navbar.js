import React from 'react'
import '../App.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
function Navbar(props) {
  // console.log(props.userName,"lets see")
  return (
    <Row className='titlebar'>
      <Col className='siteName'>
        Recipe House
          </Col>
      <Col>
        <Link to='/home'>Home</Link>
      </Col>
      <Col>
        <Link to='/content'>Based On Ingredients</Link>
      </Col>
      <Col>
        <Link to={{
          pathname: '/collaboration',
          state: {
            userName: props.userName
          }
        }} > Recommendation from US</Link>
      </Col>
      <Col>
        <Link to='/rateRecipe'>Rate Recipes</Link>
      </Col>
      <Col>
        <Link to='/addrecipe'>Add recipe</Link>
      </Col>
    </Row>
  )
}

export default Navbar
