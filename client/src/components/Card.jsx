import React from 'react';
import { Link } from 'react-router-dom';


export default function Card({ id, name, img, temperament }){
    return(
        <div>
            <Link to={`/dogs/${id}`}><h3>{ name }</h3></Link>
            {temperament?.map((t, i) => {
                return(
                    <h5 key={i}> {t}</h5>
                )
            })}
            <img src={ img } alt="img del perro"/>
        </div>
    )
}