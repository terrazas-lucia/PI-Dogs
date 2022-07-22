import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/actions';
import { useEffect } from 'react';
import './styles/Details.css';

export default function Detail(props){
    const dispatch = useDispatch()
    const myDog = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    return(
        <div className='details_page'>
            {myDog.hasOwnProperty("id") ? 
            <div className='details_page_component'>
                <h1>{myDog.name}</h1>
                <img src={myDog.image} alt="dog"/>
                <h4>Nombre: {myDog.name}</h4>
                <h4>Peso: {myDog.weight}kg</h4>
                <h4>Altura: {myDog.height}cm</h4> 
                <h4>Años de vida: {myDog.life_span}</h4>
                <h4>Temperamento: {myDog.temperament}</h4>
            </div> : <p> Cargando, tenga paciencia ૮꒰ ˶• ༝ •˶꒱ა ♡ </p>} 
            <Link to="/home"> <button>Volver a la página principal</button></Link>
        </div> 
    )
}