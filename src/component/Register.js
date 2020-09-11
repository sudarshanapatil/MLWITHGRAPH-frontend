import React, { Component } from 'react'
import '../App.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const baseUrl = 'https://recomsystemnode.herokuapp.com/';
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
    let { name, password } = this.state 

    fetch(`${baseUrl}/register`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(recipes => {
        this.props.history.push({
          pathname: '/login',
          state: {
            userName: this.state.name
          }
        });
      })
      .catch(err => {
        this.setState({
          recipes: []
        })
      })
  }
  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit (event) {
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
