import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postDog, getTemperament } from '../actions/actions';
import { useDispatch } from 'react-redux';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre.';
    }
    else if(typeof input.name !== undefined){
        if(!input.name.match(/^[a-zA-Z]+$/)){
            errors.name = 'No se permiten caracteres especiales, solo letras.';
        }
    }

    if(!input.weight){
        errors.weight = 'Se requiere peso.'
    }

    if (!input.height){
        errors.height = 'Se requiere altura.';
    }

    if(!input.lifespan){
        errors.lifespan = 'Se requiere años de vida.';
    } 

    if(!input.temperament){
        errors.temperament = 'Por favor, elija temperamentos del perreque.'
    }

    if(!input.image){
        errors.image = 'Se requiere una imagen.';
    }
    if(input.image !== "undefined"){
        if(input.image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]\.[a-z]\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            errors.image = 'URL invalido.'
        }
    }

    return errors;

}

export default function CreateDog(){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        weight: "",
        height: "",
        lifespan:"",
        temperament: [],
        image: ""
    })

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e){
        e.preventDefault();
        if(input.type.length === 2){
            return
        } if (input.type.includes(e.target.value)){
            return
        }
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!input.temperament.length){
            setErrors({...errors, temperament: 'Por favor, elija temperamentos.'})
            return
        } 

        dispatch(postDog(input));
        alert("Perreque creado!");
        setInput({
            name: "",
            weight: "",
            height: "",
            lifespan:"",
            temperament: [],
            image: ""
        })
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== el)
        });
    }

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch]);

    return(
        <div>
            <h1>Ingresa tu perreque!</h1>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={input.name} name="name" required onChange={e => {handleChange(e)}}/>
                        {errors.name && ( <p>{errors.name}</p>)}
                    </div>
                    <div>
                        <label>Peso:</label>
                        <input type="range" value={input.weight} min="3" max="50" name="weight" required onChange={e => {handleChange(e)}}/>
                        {errors.weight && ( <p>{errors.weight}</p>)}
                    </div>
                    <div>
                        <label>Altura:</label>
                        <input type="range" value={input.height} min="50" max="150" name="height" required onChange={e => {handleChange(e)}}/>
                        {errors.weight && ( <p>{errors.weight}</p>)}
                    </div>
                    <div>
                        <label>Años de vida:</label>
                        <input type="range" value={input.lifespan} min="6" max="20" name="lifespan" required onChange={e => {handleChange(e)}}/>
                        {errors.height && ( <p>{errors.height}</p>)}
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input type="url" value={input.image} name="img" required onChange={e => {handleChange(e)}}/>
                        {errors.image && ( <p>{errors.image}</p>)}
                    </div>
                    <label>Tipo:</label>
                    <select onChange={e => {handleSelect(e)}}>
                        {input.temperament}
                    </select>
                    {errors.temperament && (<p>{errors.temperament}</p>)}
                    <button type='submit'>¡Crear!</button>
                </form>
                {input.temperament.map(el =>
                    <div>
                        <p>{el}</p> 
                        <button onClick={() => handleDelete(el)}>X</button>
                    </div>    
                )}
            </div>
            <Link to='/home'><button>Volver a la página principal</button></Link>
        </div>
    )
}