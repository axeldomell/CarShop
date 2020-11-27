import React, { Component } from "react";
import { Link } from "react-router-dom";
import './component.css';
import {CardDeck, Card} from 'react-bootstrap'

class Cars extends Component{
  constructor(props){
    super(props);
    this.state = { cars: [], isLoaded: false}
  }

  componentDidMount(){
    fetch('http://localhost:5000/GET/carmodels')
    .then(data => data.json())
    .then(car => this.setState({ isLoaded: true, cars: car}));
  }


render(){
  var { isLoaded, cars } = this.state;
  if(!isLoaded){
    return(
      <div>Loading...</div>
    );
  }else{
    console.log(cars);
  return(
    <div>
      <div className="carText">
        <h1>Cars avaliable</h1>
      </div>
      <div>
        {
          <CardDeck className="cards">
    {
      cars.map((car) => {
        return(
          <Card>
            <Card.Body>
              <Card.Title>{car.brand} {car.model}</Card.Title>
              <Card.Text>
                This car is really extraordinary. Fast, reliable and beutiful.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">  Price begins at: {car.price}kr</small>
            </Card.Footer>
          </Card>
              );
      })
      }
</CardDeck>
        }
      </div>
    </div>
    );
  }
}
}
export default Cars;
