import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { filterCreated, getDogs, orderByName, orderByWeight } from '../actions/actions';
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 12;
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

    function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handleFilterAscDesc(e){
            dispatch(orderByName(e.target.value));
    }

    function handleFilterWeight(e){
        dispatch(orderByWeight(e.target.value));
    }
    
    const handleOnClick = ()=> {
        dispatch(getDogs());
    }

    return(
        <div>
            <nav>
                <div onClick={handleOnClick}><h1> Perreques! </h1></div>
                <SearchBar/>
                <Link to = '/dogs'><button class="button-create">Ingresa tu perreque!</button></Link>
                </nav>
                <div>
                    <h4>Filtrar por: </h4>
                    <div>
                        <select onChange={e => handleFilterByCreated(e)}>
                            <option value='all'>Todos los perreques</option>
                            <option value='created'>Creados por mi</option>
                            <option value='api'>Perreques ya existentes</option>
                        </select>
                    </div>
                    <div>
                        <h4>Orden alfabetico:</h4>
                        <select onChange={e => handleFilterAscDesc(e)}>
                            <option value='asc'> A - Z </option> 
                            <option value='desc'> Z - A </option> 
                            
                        </select>
                        <h4>Peso:</h4>
                        <select onChange={e => handleFilterWeight(e)}>
                            <option value='grandote'> Del más pesado al mas liviano </option>
                            <option value='chiquito'> Del más liviano al mas fuerte </option>
                        </select>
                    </div>
                </div>
            {  error?.length ? <p> {error} </p> : 
            currentDog?.map((el, i) => { //se trae el estado global y pregunta si existe y lo mapea y se lo pasa a la card
                return(

                    <Card key={i} id={el.id} name={el.name} img={el.img} temperament={el.temperament} />
                )
            })}
            <Pagination dogsPerPage={ dogsPerPage } allDogs={ allDogs.length } pagination={ pagination }/>
        </div>
    )
}