import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 12;
    const indexOfLastDog= currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; 
    const currentDog = allPokemons.slice(indexOfFirstDog, indexOfLastDog);
    const [filterDog, setFilterDog] = useState(currentDog);
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

    function handleFilterStrength(e){
        dispatch(orderByStrength(e.target.value));
    }
    
    const handleOnClick = ()=> {
        dispatch(getDogs());
    }

    return(
        <div className="home-box">
            <nav>
                <div onClick={handleOnClick}><h1> Perreques! </h1></div>
                <SearchBar/>
                <Link to = '/dogs'><button class="button-create">Ingresa tu perreque!</button></Link>
                </nav>
                <div className="filter">
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
                        <select onChange={e => handleFilterStrength(e)}>
                            <option value='strongest'> Del más fuerte al más debil </option>
                            <option value='weakest'> Del más debil al más fuerte </option>
                        </select>
                    </div>
                </div>
            {  error?.length ? <p> {error} </p> : 
            currentDog?.map((el, i) => { //se trae el estado global y pregunta si existe y lo mapea y se lo pasa a la card
                console.log(el);
                return(

                    <Card key={i} id={el.id} name={el.name} img={el.img} types={el.types} />
                )
            })}
            <Pagination dogsPerPage={ dogsPerPage } allDogs={ allDogs.length } pagination={ pagination }/>
        </div>
    )
}