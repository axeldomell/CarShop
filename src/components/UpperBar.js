import React, { Component } from "react";
import { Link } from "react-router-dom";

import {Navbar, NavDropdown, Nav, Button, Form, FormControl} from 'react-bootstrap'

class UpperBar extends Component{
  constructor(props){
    super(props);
    this.state = { user: 'My Page'};
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user !== null){
    this.setState({user: user.username});
  }
  }


render(){
  console.log(this.state.user);
  return(
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="home">Axel's Car Shop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="home">Home</Nav.Link>
        <Nav.Link href="cars">Cars</Nav.Link>
        <NavDropdown title={this.state.user} id="basic-nav-dropdown">
          <NavDropdown.Item href="login">Log in</NavDropdown.Item>
          <NavDropdown.Item href="register">Register</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="myPage">My page</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search for a car" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
)
}
}
export default UpperBar;
