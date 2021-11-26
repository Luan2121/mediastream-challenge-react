import { discountRules } from 'data/constants';
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

    return useMemo( () => ({ 
        addMovie, 
        items: state.movies, 
        total: state.total,
        discount: state.discount, 
        increment, 
        decrement 
    }) , [addMovie, state, increment, decrement] );
}

//by passing discount rules to initial state 
//we can update the rules later
export const initialState = {
    discountRules,
    movies: [
        {
          id: 1,
          name: 'Star Wars',
          price: 20,
          quantity: 2
        }
    ],
    moviesIds: [1],
    total: 40,
    discount: 0
}

// Actions 
export const ADD_MOVIE_TO_CART = 'ADD_MOVIE_TO_CART'
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
// Reducer
export const cartReducer = (state,action) => {
    const { name , payload } = action
    switch(name){
        case ADD_MOVIE_TO_CART:
            return addMovieToCart(state,payload)
        case INCREMENT:
        case DECREMENT:
            return updateCart(state,action)
        default:
            return {...state}
    }
}

const updateCart = (state,{ name , payload }) => {
    let newMovies = state.movies.reduce( (movies,currentMovie) => {
        if(currentMovie.id === payload.movie.id){
            movies.push( {
                ...currentMovie, 
                quantity: name === INCREMENT ? currentMovie.quantity + 1 : currentMovie.quantity - 1
            })
        }else {
            movies.push(currentMovie)
        }
        return movies;
    } , []).filter( movie => movie.quantity > 0 );

    let newMoviesIds = newMovies.map( movie => movie.id );

    return ({
        ...state,
        total: name === DECREMENT ? state.total - payload.movie.price : state.total + payload.movie.price,
        movies: newMovies,
        moviesIds: newMoviesIds,
        discount: getDiscount(state.discountRules,newMoviesIds)
    })
}

const addMovieToCart = (state,payload) => {
    let movieAlreadyAdded = false;
    let newMoviesIds = [ ...new Set( [...state.moviesIds , payload.movie.id ] ) ]
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

    return {
        ...state, 
        movies: newMovies, 
        total: state.total + payload.movie.price,
        moviesIds: newMoviesIds,
        discount: getDiscount(state.discountRules,newMoviesIds)
    };
}

const getDiscount = (discountRules,moviesIds) => {
    const discountRule = discountRules.find( rule => {
        return rule.m.every( movieId => moviesIds.includes( movieId ) )
    });
    //Here we check that the  discount is only applied if ONLY the movies in
    //the cart are in the discount rule m property
    if( discountRule?.m.length !== moviesIds.length ){
        return 0
    }

    return discountRule?.discount ?? 0;
}

export default useCart