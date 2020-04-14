import React, { Component } from 'react'
import '../App.css'
import '../styles/Login.css'
import { Button, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
class Login extends Component {
  constructor () {
    super()
    this.state = {
      showHome: false,
      name: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  checkLogin = () => {
    console.log('In login USer')
    let { name, password } = this.state

    fetch('http://localhost:1337/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log('in res', data)
        if(data.code===200)
        this.setState({
          showHome: true
        })
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
      <div className='login-body'>
        <div className='login-section'>
          Recipe Recommendation System
          <Form onSubmit={this.handleSubmit}>
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

            <Button variant='warning' type='submit' onClick={this.checkLogin}>
              {this.state.showHome && <Link to='/home'>Login</Link>}
            </Button>

            <Button variant='info'>
              {/* <Link to='/register'>Register</Link> */}
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default Login
