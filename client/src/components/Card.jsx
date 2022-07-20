import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css'

export default function Card({ id, name, image, temperament, weight }){
    return(
        <div className='card-box'>
            <Link to={`/dogs/${id}`}><h3>{ name }</h3></Link>
            <h5> { temperament }</h5> 
            <h5> { weight }</h5>
            <img src={ image } alt="img del perro"/>
           
        </div>
    )
}