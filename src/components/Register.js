import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import './component.css';
import {Form, Button} from 'react-bootstrap'

class Register extends Component{
  constructor(props){
    super(props);
    this.state = { username: '', name: '', password: '', redirect: false}
    this.handleUserInputU = this.handleUserInputU.bind(this);
    this.handleUserInputP = this.handleUserInputP.bind(this);
    this.handleUserInputN = this.handleUserInputN.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInputU(e){
    this.setState({username: e.target.value,});
  }
  handleUserInputP(e){
    this.setState({password: e.target.value,});
  }
  handleUserInputN(e){
    this.setState({name: e.target.value,});
  }
  async handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:5000/POST/user',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      isEmployee: null,
      connection: null
    })
  }).then(data => {
    console.log(data);
  })
  this.setState({username:'', password:'', name: ''});
  this.setState({ redirect: true });
  }

render(){
  return(
    <div>
    { this.state.redirect ? (<Redirect push to="/"/>) : null }
    <div className="logIn">
      <h3>Register</h3>
    </div>
    <div>
      <Form className="form">
        <Form.Group >
          <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={this.state.name}
              onChange={this.handleUserInputN}
              placeholder="Full name" />
        </Form.Group>
        <Form.Group >
          <Form.Label>Username</Form.Label>
            <Form.Control
              value={this.state.username}
              onChange={this.handleUserInputU}
              placeholder="Username" />
            <Form.Text className="text-muted">
            Choose a nickname
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleUserInputP}
          />
        </Form.Group>
  <Button variant="primary" onClick={this.handleSubmit} type="Log in">
    Register
  </Button>
  </Form>
  </div>
</div>
  );
  }
}


export default Register;
