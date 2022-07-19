import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ id, name, image, temperament }){
    return(
        <div>
            <Link to={`/dogs/${id}`}><h3>{ name }</h3></Link>
            <h5> { temperament }</h5>
            <img src={ image } alt="img del perro"/>
        </div>
    )
}