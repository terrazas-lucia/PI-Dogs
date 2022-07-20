import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css'
import imgLandingPage from './img/landingpage.png'

export default function LandingPage(){
    return(
        <div className='landing-page'>
            <h1>¡Bienvenidx al portal de perreques!</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
            <img src={imgLandingPage} alt="foto de landingpage" />
        </div>
    )
}