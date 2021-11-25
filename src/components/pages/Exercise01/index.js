/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'

import { movies } from 'data/constants'
import useCart from 'hooks/useCart'
import { Fragment } from 'react';


export default function Exercise01 () {
  const { items , addMovie, increment, decrement, total, discount } = useCart();
  console.log({ 
    d: discount
  });
  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map( movie => (
            <li className="movies__list-card" key = {`movie-${movie.id}`}>
              <ul>
                <li>
                  ID: {movie.id}
                </li>
                <li>
                  Name: {movie.name}
                </li>
                <li>
                  Price: ${movie.price}
                </li>
              </ul>
              <button onClick={() => addMovie(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {items.map( (item,index) => (
            <li className="movies__cart-card" key = {`cart-item-${index}`} >
              <ul>
                <li>
                  ID: {item.id}
                </li>
                <li>
                  Name: {item.name}
                </li>
                <li>
                  Price: ${item.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrement(item)}>
                  -
                </button>
                <span>
                  {item.quantity}
                </span>
                <button onClick={() => increment(item)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <div>
            <p>Total: { discount > 0 
              ? (
                <Fragment>
                  <del>${total}</del> 
                  <span>${applyDiscount(total,discount)}</span>
                </Fragment>
              ) : `$${total}` } 
            </p>
          </div>
        </div>
        { discount > 0 && (
          <div className = "movies__cart-discount">
            <p>descuento aplicado!</p>
          </div>
        )}
      </div>
    </section>
  )
} 

const applyDiscount = (total,discount) => {
  return total - (total * discount)
}