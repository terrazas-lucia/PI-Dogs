import React from 'react';
import { useSelector } from 'react-redux';

export default function Pagination({ nPages, currentPage, setCurrentPage }){
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1, 10); 
    const error = useSelector((state) => state.error);

    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage (currentPage - 1)
    }

    return(
        <> {error?.length ? null : 
        <nav>
            <ul>
                <button onClick={prevPage}> ⬅ </button>
                { pageNumbers.map(pgNumber => {
                    return(
                    <button key={pgNumber} onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</button>
                )})}
                <button onClick={nextPage}> ⮕ </button> 
            </ul>
        </nav>}
        </>
    )
}