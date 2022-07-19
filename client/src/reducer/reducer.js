const initialState = {
    dogs : [],
    allDogs: [],
    detail: {},
    temperament: [],
    error: ""
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs:action.payload, 
                allDogs:action.payload,
                error: ""
            }
        case 'FILTER_BY_CREATED':
            const allDogs = state.allDogs;
            const createdFilter = action.payload === 'created' ? allDogs.filter( el => el.createdInDb) : allDogs.filter( el => !el.createdInDb)
            return{
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : createdFilter
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ? state.dogs.sort(function(a, b){
                if(a.name > b.name){
                    return 1;
                } if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : state.dogs.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                } if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                dogs: [...sortedArr]
            }
        case 'ORDER_BY_WEIGHT':
            let sortedArrStrength = action.payload === 'light' ? state.dogs.sort(function(a, b){
                if(a.weight > b.weight){
                    return 1;
                } if(b.weight > a.weight){
                    return -1;
                }
                return 0;
            }) : state.dogs.sort(function(a, b){
                if(a.weight > b.weight){
                    return -1;
                } if(b.weight > a.weight){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
               dogs:[...sortedArrStrength]
            }
        case 'GET_NAME':
            return{
                ...state,
                dogs:action.payload,
                error: ""
            }
        case 'GET_TEMPERAMENT':
            return{
                ...state,
                temperament:action.payload,
                error: ""
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload,
                error: ""
            }
        case 'CLEAR_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        case "POST_DOG":
            return{
                ...state,
            }
        case "GET_ERROR":
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
        }
}

export default rootReducer;
