import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return(
        <div className="landing-box">
            <h1>¡Bienvenidx al portal de perreques!</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
            <img src={imgLandingPage} alt="imagen de inicio" />
        </div>
    )
}