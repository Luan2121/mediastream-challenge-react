import { Fragment } from "react";
import { applyDiscount } from "utils";
import CartItem from "./CartItem";

const MoviesCart = ({ 
	items, 
	discount,
	total,
	onDecrement,
	onIncrement
}) => {
  return (
    <div className="movies__cart">
      <ul>
        {items.map( (item,index) => (
          <CartItem 
            item = {item} 
            key = {`cart-item-${index}`}
            onIncrement = {onIncrement}
            onDecrement = {onDecrement}
          /> 
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
          <p>discount applied!</p>
        </div>
      )}
    </div>
  )
}

export default MoviesCart;