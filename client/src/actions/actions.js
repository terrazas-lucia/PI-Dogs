import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs",{});
        console.log(json.data)
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function filterCreated(payload){
    return{
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return({
        type: 'ORDER_BY_WEIGHT',
        payload
    })
}

export function orderByTemperament(payload){
    return({
        type: 'ORDER_BY_TEMPERAMENT',
        payload
    })
}

export function getNameDogs(payload){
    return async function(dispatch){
      try {
          var json = await axios.get("http://localhost:3001/dogs?name=" + payload);
          console.log(json.data)
          if(!json.data.length){
            dispatch({
                type: 'GET_ERROR',
                payload:json.data
            })
            return
          }
            dispatch({
              type: 'GET_NAME',
              payload: json.data
        })   
    } catch (error){
        dispatch({
            type: 'GET_ERROR',
            payload: error.response.data.msg
        })
        }
    }
}

export function getTemperament(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/temperaments",{});
    return dispatch({ 
        type: 'GET_TEMPERAMENT',
        payload: json.data
    });
    }
}

export function getDetail(id){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/dogs/" + id);
        return dispatch({
            type: "GET_DETAIL",
            payload: json.data[0]
        })
    }
}

export function postDog(payload){
    return async function(dispatch){
        var json = await axios.post("http://localhost:3001/dogs", payload);
        return json;
    }
}

export function clearDogs(){
        return {
            type: 'CLEAR_DETAILS',
            payload: {}
        }
}