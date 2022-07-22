import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { filterCreated, getDogs, getTemperament, orderByName, orderByTemperament, orderByWeight } from '../actions/actions';
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './styles/Home.css'


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperament = useSelector ((state) => state.temperament);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const indexOfLastDog= currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; 
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const nPages = Math.ceil(allDogs.length / dogsPerPage);
    const error = useSelector((state) => state.error);

    

    useEffect(() => {
        dispatch(getDogs()); //lo mismo que hacer mapdispatchtoprops 
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch])

    function handleSortedByCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handleSortedAscDesc(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
    }

    function handleSortedWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
    }

    function handleOrder(e){
        if(e.target.value === 'asc' || e.target.value === 'desc'){
            handleSortedAscDesc(e);
        }
        else if(e.target.value === 'heavy' || e.target.value === 'light'){
            handleSortedWeight(e);
        }
    }

    function handleFilterTemperament(e){
        e.preventDefault();
        dispatch(orderByTemperament(e.target.value));
    }
    
    const handleOnClick = ()=> {
        dispatch(getDogs());
    }

    return(
        <div className='homepage'>
            <nav className='homepage-navbar'>
                <ul>
                    <li><div onClick={handleOnClick}><h1> Perreques! </h1></div></li>
                    <li><Link to = '/'><button>Volver a la pagina principal</button></Link></li>
                    <li><Link to = '/dogs'><button>Ingresa una raza nueva</button></Link></li>
                    <li><SearchBar/></li>
                    <li><div className='homepage-selects'>
                        <h4>Ordenar: </h4>
                        <div>
                            <select onChange={e => handleSortedByCreated(e)}>
                                <option value='all'>Todos los perreques</option>
                                <option value='created'>Creados por mi</option>
                                <option value='api'>Perreques ya existentes</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={e => handleOrder(e)}>
                                <option value='asc'> de la A a la Z </option> 
                                <option value='desc'> de la Z a la A </option> 
                                <option value='heavy'> Del más pesado al mas liviano </option>
                                <option value='light'> Del más liviano al mas fuerte </option>   
                            </select>
                            <select onChange={e => handleFilterTemperament(e)}>
                            <option defaultValue="selected" hidden="hidden">Filtrar por temperamento</option>
                                {temperament.map((el)=>(
                                <option key={el} value={el}>{el}</option>
                            ))}  
                            </select>
                        </div>
                    </div></li>
                </ul>
            </nav>
            <div className='homepage_card'>
            {  error?.length ? <p> {error} </p> : 
            currentDog?.map((el, i) => { //se trae el estado global y pregunta si existe y lo mapea y se lo pasa a la card
                return(
                    <Card key={i} id={el.id} name={el.name} weight={el.weight} temperament={el.temperament} image={el.image}/>
                )
            })}
            </div>
            <div className='homepage_pagination'>
            <Pagination nPages = {nPages} currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
            </div>
        </div>
    )
}