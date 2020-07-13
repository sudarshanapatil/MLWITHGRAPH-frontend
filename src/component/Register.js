import React, { Component } from 'react'
import '../App.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      showLogin:false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  registerUser = () => {
    console.log("In register USer")
    let { name, password } = this.state 

    fetch('http://localhost:1337/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(recipes => {
        console.log("in res",recipes)
        this.props.history.push({
          pathname: '/login',
          state: {
            userName: this.state.name
          }
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          recipes: []
        })
      })
  }
  handleChange (event) {
    console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit (event) {
    console.log('in submit')
    event.preventDefault()
  }
  render () {
    return (
      <div className='register-body'>
        <div className='register-section'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name='name'
                type='text'
                placeholder='Enter name'
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                placeholder='Password'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              onClick={this.registerUser}
            >
              <Link to='/login'>Register</Link>
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default Register
