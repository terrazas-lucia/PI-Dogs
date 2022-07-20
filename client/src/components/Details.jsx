import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearDogs, getDetail } from '../actions/actions';
import { useEffect } from 'react';

export default function Detail(props){
    const dispatch = useDispatch()
    const myDog = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        return() => dispatch(clearDogs());
    }, [dispatch, props.match.params.id]);

    return(
        <div>
            {myDog.hasOwnProperty("id") ? 
            <div>
                <h1>{myDog.name}</h1>
                <img src={myDog.image} alt="dog"/>
                <h4>Nombre: {myDog.name}</h4>
                <h4>Peso: {myDog.weight}</h4>
                <h4>Altura: {myDog.height}</h4> 
                <h4>Años de vida: {myDog.life_span}</h4>
                <h4>Temperamento: {myDog.temperament}</h4>

            </div> : <p> loading :3 </p>} 
            <Link to="/home"> <button>Volver a la página principal</button></Link>
        </div> 
    )
}
