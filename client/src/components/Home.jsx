import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { filterCreated, getDogs, orderByName, orderByTemperament, orderByWeight } from '../actions/actions';
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './styles/Home.css'


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperament = useSelector ((state) => state.temperament);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const indexOfLastDog= currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; 
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const error = useSelector((state) => state.error);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getDogs()); //lo mismo que hacer mapdispatchtoprops 
    }, [dispatch])

    function handleSortedByCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handleSortedAscDesc(e){
        dispatch(orderByName(e.target.value));
    }

    function handleSortedWeight(e){
        dispatch(orderByWeight(e.target.value));
    }

    function handleFilterTemperament(e){
        dispatch(orderByTemperament(e.target.value));
       
    }
    
    const handleOnClick = ()=> {
        dispatch(getDogs());
    }

    return(
        <div className='homepage'>
            <nav>
                <div onClick={handleOnClick}><h1> Perreques! </h1></div>
                <SearchBar/>
                <Link to = '/dogs'><button>Ingresa una raza nueva!</button></Link>
                </nav>
                <div>
                    <h4>Ordenar: </h4>
                    <div>
                        <select onChange={e => handleSortedByCreated(e)}>
                            <option value='all'>Todos los perreques</option>
                            <option value='created'>Creados por mi</option>
                            <option value='api'>Perreques ya existentes</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={e => handleSortedAscDesc(e)}>
                        <option defaultValue="selected" hidden="hidden">Alfabeticamente</option>
                            <option value='asc'> A - Z </option> 
                            <option value='desc'> Z - A </option>    
                        </select>
                       
                        <select onChange={e => handleSortedWeight(e)}>
                        <option defaultValue="selected" hidden="hidden">por Peso</option>
                            <option value='heavy'> Del más pesado al mas liviano </option>
                            <option value='light'> Del más liviano al mas fuerte </option>
                        </select>
                        <select onChange={e => handleFilterTemperament(e)}>
                        <option defaultValue="selected" hidden="hidden">Filtrar por temperamento</option>
                            {temperament.map((el)=>(
                              <option value={el}>{el}</option>
                           ))}  
                        </select>
                    </div>
                </div>
            {  error?.length ? <p> {error} </p> : 
            currentDog?.map((el, i) => { //se trae el estado global y pregunta si existe y lo mapea y se lo pasa a la card
                return(
                    <Card key={i} id={el.id} name={el.name} weight={el.weight} temperament={el.temperament} image={el.image}/>
                )
            })}
            <Pagination dogsPerPage={ dogsPerPage } allDogs={ allDogs.length } pagination={ pagination }/>
        </div>
    )
}