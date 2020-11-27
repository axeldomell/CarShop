import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UpperBar from './components/UpperBar'
import CarouselComp from './components/CarouselComp'
import Cars from './components/Cars'
import LogIn from './components/LogIn'
import Register from './components/Register'
import MyPage from './components/MyPage'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component{
  constructor(props){
    super(props);
    this.state = { user: {}}
    this.setUser = this.setUser.bind(this);
  }

  setUser(user){
    this.setState({user: user})
    localStorage.setItem('user', JSON.stringify(user));
  }


render() {
  const userData = this.state.user;
  console.log(userData);
  return (
    <div className="containter">
        <Router>
          <div>
            <UpperBar data={userData}/>
          </div>
          <div>
          <Switch>
          <Route path="/login">
            <LogIn setUser={this.setUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/myPage">
            <MyPage data={userData}/>
          </Route>
          <Route path="/cars">
            <Cars />
          </Route>
          <Route path="/">
            <CarouselComp />
          </Route>
          <Route path="/home">
            <CarouselComp />
          </Route>
        </Switch>
          </div>
        </Router>
      </div>
  );
}
}

export default App;
