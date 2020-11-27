import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Carousel} from 'react-bootstrap'
import aston from './images/aston.jpg';
import bmw from './images/bmw2.jpg';
import prius from './images/prius.jpg';
class CarouselComp extends Component{

render(){
  return(
    <Carousel>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={aston}
            alt="First slide"
            width={400}
            height={600}
        />
        <Carousel.Caption>
            <h3>Aston Martin Vanquich</h3>
            <p>Roaring fast</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={prius}
            alt="Third slide"
            width={400}
            height={600}
        />

        <Carousel.Caption>
            <h3>Toyota Prius</h3>
            <p>Small and reliable</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={bmw}
            alt="Third slide"
            width={400}
            height={600}
        />

        <Carousel.Caption>
            <h3>BMW 3335i</h3>
            <p>Needs no introduction</p>
        </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

)
}
}
export default CarouselComp;
