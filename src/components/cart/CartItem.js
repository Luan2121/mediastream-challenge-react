
const CartItem = ({ 
	item,
	onIncrement,
	onDecrement, 
}) => {
  return (
    <li className="movies__cart-card">
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
				<button onClick={() => onDecrement(item)}>
					-
				</button>
				<span>
					{item.quantity}
				</span>
				<button onClick={() => onIncrement(item)}>
					+
				</button>
			</div>
    </li>
  )
}

export default CartItem;