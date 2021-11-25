import { useCallback, useMemo, useReducer } from 'react';

const useCart = () => {
    const [ state , dispatch ] = useReducer( cartReducer , initialState )

    const addMovie = useCallback( (movie) => {
        dispatch({ name: ADD_MOVIE_TO_CART, payload: { movie } })
    } , [dispatch])

    const increment = useCallback( (movie) => {
        dispatch({ name: INCREMENT, payload: { movie } })
    }, [dispatch])

    const decrement = useCallback( (movie) => {
        dispatch({ name: DECREMENT , payload: { movie } })
    }, [dispatch])

    return useMemo( () => ({ addMovie, items: state.movies, total: state.total, increment, decrement }) , [addMovie, state, increment, decrement] );
}

const initialState = {
    movies: [
        {
          id: 1,
          name: 'Star Wars',
          price: 20,
          quantity: 2
        }
    ],
    total: 40
}

// Actions 
const ADD_MOVIE_TO_CART = 'ADD_MOVIE_TO_CART'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const cartReducer = (state,action) => {
    const { name , payload } = action
    switch(name){
        case ADD_MOVIE_TO_CART:
            let movieAlreadyAdded = false;
            let newMovies = state.movies.map( ( movie ) => {
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
            return {...state, movies: newMovies, total: state.total + payload.movie.price };

        case INCREMENT:
        case DECREMENT:
            return {
                ...state,
                total: name === DECREMENT ? state.total - payload.movie.price : state.total + payload.movie.price,
                movies: state.movies.reduce( (movies,currentMovie) => {
                    if(currentMovie.id === payload.movie.id){
                        movies.push( {
                            ...currentMovie, 
                            quantity: name === INCREMENT ? currentMovie.quantity + 1 : currentMovie.quantity - 1
                        })
                    }else {
                        movies.push(currentMovie)
                    }
                    return movies;
                } , []).filter( movie => movie.quantity > 0 )
            }
        default:
            return {...state}
    }
}



export default useCart