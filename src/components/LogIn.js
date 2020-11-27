import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import './component.css';
import {Form, Button, Alert} from 'react-bootstrap'

class LogIn extends Component{
  constructor(props){
    super(props);
    this.state = { username: '', password: '', user: [], redirect: false}
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserInputPass = this.handleUserInputPass.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleUserInput(e){
    this.setState({username: e.target.value,});
  }

  handleUserInputPass(e){
    this.setState({password: e.target.value,});
  }

  async validate(e){
    e.preventDefault();
    const username = this.state.username;
    const user = await fetch(`http://localhost:5000/GET/user/${username}`)
    .then(data => data.json());
    if(user[0].password === this.state.password){
      this.props.setUser(user[0]);
      this.setState({username:'', password:''});
      this.setState({ redirect: true });
    }else{
    this.setState({username:'', password:''});
    alert("Wrong password or username, please try again.");
  }
  }


render(){
  return(
    <div>
    { this.state.redirect ? (<Redirect push to="/"/>) : null }
    <div className="logIn">
      <h3>Log in</h3>
    </div>
    <div>
      <Form className="form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
            <Form.Control
              value={this.state.username}
              onChange={this.handleUserInput}
              placeholder="Enter email" />
            <Form.Text className="text-muted">
            Choose a nickname.
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleUserInputPass}
          />
        </Form.Group>
  <Button variant="primary" onClick={this.validate} type="Log in">
    Submit
  </Button>
  </Form>
  </div>
</div>
  );
  }
}


export default LogIn;
