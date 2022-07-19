import React from 'react';
import { useSelector } from 'react-redux';

export default function Pagination({ dogsPerPage, allDogs, pagination }){
    const pageNumbers = []; 
    const error = useSelector((state) => state.error);

    for( let i=1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i); 
    }

    return(
        <> {error?.length ? null : 
        <nav>
            <ul>
                { pageNumbers && pageNumbers.map((number, i) => {
                    return(
                    <button key={i} onClick={() => pagination(number)}>{number}</button>
                )})}
            </ul>
        </nav>}
        </>
    )
}