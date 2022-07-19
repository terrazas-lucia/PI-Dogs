import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDogs } from '../actions/index';
import { useEffect } from 'react';
import './styles/Detail.css';

export default function Detail(props){
    const dispatch = useDispatch()
    const myDog = useSelector((state) => state.detail);
    

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));

        return() => dispatch(clearPokemons());
    }, [dispatch]);
    
    console.log("mydog detail", myDog)
    return(
        <div className='detail-box'>
            {myDog.hasOwnProperty("id") ? 
            <div>
                <h1>{myDogs.name}</h1>
                <img src={myDogs.img} alt="dog" style={{width: "96px", height: "96px"}}/>
               
                { myDog.temperament?.map((type, i) => {
                    return(
                      <h3 key={i}>{type}</h3>  
                    )
                })}
                <h4>Nombre: {myDog.name}</h4>
                <h4>Peso: {myDog.weight}</h4>
                <h4>Altura: {myDog.height}</h4>
                <h4></h4>
            </div> : <p> loading :3 </p>} 
            <Link to="/home"> <button>Volver a la página principal</button></Link>
        </div> 
    )
}
