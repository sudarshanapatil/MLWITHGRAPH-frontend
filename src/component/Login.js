import React, { Component } from 'react'
import '../App.css'
import '../styles/Login.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      password: ''
    }
  }
  login = () => {
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event, updateUsername) => {
    event.preventDefault()
    let { name, password } = this.state;

    fetch('https://recomsystemnode.herokuapp.com/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(loginRes => {
        if (loginRes.code === 200)
          updateUsername(name);
        this.props.history.push({
          pathname: '/home',
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
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div className='login-body'>
            <div className='login-section'>
              Recipe Recommendation System
            <Form onSubmit={(e) => this.handleSubmit(e, context.updateUserName)}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Enter email'
                    onChange={this.handleChange}
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    onChange={this.handleChange}
                    placeholder='Password'
                  />
                </Form.Group>

                <Button variant='warning' type='submit'>
                  Login
              </Button>
                <Button variant='info'>
                  <Link to='/register'>Register</Link>
                </Button>
              </Form>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}
export default Login
