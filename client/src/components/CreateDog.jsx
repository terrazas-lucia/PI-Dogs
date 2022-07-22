import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postDog, getTemperament } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import './styles/CreateDog.css'
 /* eslint-disable */

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

    if(!input.life_span){
        errors.life_span = 'Se requiere años de vida.';
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
    const temperament = useSelector(state => state.temperament);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        weight: "",
        height: "",
        life_span: "",
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

    function handleRangeWeight(e){ 
        e.preventDefault();
        setInput({
          ...input,
          weight: parseInt(e.target.value)
        })
      }

      function handleRangeHeight(e){ 
        e.preventDefault();
        setInput({
          ...input,
          height: parseInt(e.target.value)
        })
      }

      function handleRangeLifespan(e){ 
        e.preventDefault();
        setInput({
          ...input,
          life_span: parseInt(e.target.value)
        })
      }


    function handleSelect(e){
        e.preventDefault();
        if (input.temperament.includes(e.target.value)){
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
        alert("Raza creada con exito :)");
        setInput({
            name: "",
            weight: "",
            height: "",
            life_span: "",
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
        <div className='createdog_page'>
            <h1>Ingresa una nueva raza!</h1>
            <div className='createdog_page_component'>
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={input.name} name="name" required onChange={e => {handleChange(e)}}/>
                        {errors.name && ( <p>{errors.name}</p>)}
                    </div>
                    <div>
                        <label>Peso:</label>
                        <input type="range" value={input.weight} min="1" max="50" placeholder="3" name="weight" required onChange={e => {handleRangeWeight(e)}}/>
                        <span>{input.weight}kg</span>
                        {errors.weight && ( <p>{errors.weight}</p>)}
                        
                    </div>
                    <div>
                        <label>Altura:</label>
                        <input type="range" value={input.height} min="1" max="150" placeholder="50" name="height" required onChange={e => {handleRangeHeight(e)}}/>
                        <span>{input.height}cm</span>
                        {errors.height && ( <p>{errors.height}</p>)}
                        
                    </div>
                    <div>
                        <label>Años de vida:</label>
                        <input type="range" value={input.life_span} min="1" max="20" placeholder="6" name="life_span" required onChange={e => {handleRangeLifespan(e)}}/>
                        <span>{input.life_span} años</span>
                        {errors.life_span && ( <p>{errors.life_span}</p>)}
                        
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input type="url" value={input.image} name="image" required onChange={e => {handleChange(e)}}/>
                        {errors.image && ( <p>{errors.image}</p>)}
                    </div>
                    <label>Caracteristicas:</label>
                    <select onChange={e => {handleSelect(e)}}>
                        {temperament.map((el) => {
                            return(
                                <option value={el}>{el}</option>
                            )
                        })}  
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