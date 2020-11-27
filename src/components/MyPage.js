import React, { Component } from "react";
import { Link } from "react-router-dom";
import './component.css';
import {Table, Form, Button} from 'react-bootstrap'

class myPage extends Component{
  constructor(props){
    super(props);
    this.state = { user: {}, sales: 0, employees: [], isLoaded: false, isEmployee: false}
    this.getEmployees = this.getEmployees.bind(this);
    this.getSales = this.getSales.bind(this);
  }

  getEmployees(){
    fetch('http://localhost:5000/GET/total_sales')
    .then(data => data.json())
    .then(e => this.setState({ isLoaded: true, employees: e}));
    return 'done';
  }

  check(){
    if(this.state.user.isEmplyee){
      this.setState({isEmployee: true});
    }
  }
  getSales(){
    for(var i=0; i<this.state.employees.length; i++){
      if(this.state.employees[i].name === this.state.user.name){
        return this.state.employees[i].sales;
      }
    }
  }

  async componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user !== null){
    this.setState({user: user});
    const done = await this.getEmployees();
    this.check();
    }
  }


render(){
  const sales = this.getSales();
  if(!this.state.isEmployee){
    return(
      <div>You do not have access to this page</div>
    );
  }else{
  return(
    <div>
    <div>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Username</th>
      <th>Total Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{this.state.user.name}</td>
      <td>{this.state.user.username}</td>
      <td>{sales}kr</td>
    </tr>

  </tbody>
</Table>
</div>
<div className="logIn">
  <h3>Add a car</h3>
</div>
<div>
  <Form className="form">
    <Form.Group >
      <Form.Label>Brand</Form.Label>
        <Form.Control
          value={this.state.name}
          onChange={this.handleUserInputN}
          placeholder="Brand" />
    </Form.Group>
    <Form.Group >
      <Form.Label>Model</Form.Label>
        <Form.Control
          value={this.state.username}
          onChange={this.handleUserInputU}
          placeholder="Model" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Price</Form.Label>
      <Form.Control
      type="password"
      placeholder="Price in kr"
      value={this.state.password}
      onChange={this.handleUserInputP}
      />
    </Form.Group>
<Button variant="primary" onClick={this.handleSubmit} type="Add car">
Add car
</Button>
</Form>
</div>
</div>
    );
  }
}
}

export default myPage;
