import { useCallback, useMemo, useReducer } from 'react';


const useCart = () => {
    const [ items , dispatch ] = useReducer( cartReducer , initialState )

    const addMovie = useCallback( (movie) => {
        dispatch({ name: ADD_MOVIE_TO_CART, payload: { movie } })
    } , [dispatch]);

    return useMemo( () => ({ addMovie, items }) , [addMovie, items] );
}

const initialState = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
];

// Actions 
const ADD_MOVIE_TO_CART = 'ADD_MOVIE_TO_CART'

const cartReducer = (state,action) => {
    const { name , payload } = action
    switch(name){
        case ADD_MOVIE_TO_CART:
            let movieAlreadyAdded = false;
            let newMovies = state.map( ( movie ) => {
                if( movie.id === payload.movie.id ){
                    movieAlreadyAdded = true;
                    return { ...movie , quantity: movie.quantity + 1};
                }
                return movie;
            });
            if(!movieAlreadyAdded){
                payload.movie.quantity = 1
                newMovies.push(payload.movie)
            }
            return newMovies;
        default:
            return [...state]
    }
}

export default useCart