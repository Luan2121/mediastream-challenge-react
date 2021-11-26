import * as reducer from './useCart';
import { discountRules, movies } from 'data/constants';

describe('test useCart reducer', () => {
    it( 'shoud add a movie to cart if the was not added before' , () => {
        const state = reducer.cartReducer( 
            reducer.initialState , 
            { name: reducer.ADD_MOVIE_TO_CART, payload: { movie: movies[1] } } 
        );
        expect( state.movies ).toHaveLength(2)
    })

    it( 'should increment movies quantity if the movie is already in the movies array', () => {
        const state = reducer.cartReducer( 
            reducer.initialState , 
            { name: reducer.ADD_MOVIE_TO_CART, payload: { movie: movies[0] } } 
        );
        expect( parseInt( state.movies[0].quantity ) ).toEqual(3)
    })

    it( 'should remove movie from array if quantity gets to 0', () => {
        const initialState = {
            discountRules,
            movies: [
                {
                  id: 1,
                  name: 'Star Wars',
                  price: 20,
                  quantity: 1
                }
            ],
            moviesIds: [1],
            total: 20,
            discount: 0
        }
        const state = reducer.cartReducer( 
            initialState , 
            { name: reducer.DECREMENT, payload: { movie: movies[0] } } 
        );
        expect( state.movies ).toHaveLength(0);
    })
})