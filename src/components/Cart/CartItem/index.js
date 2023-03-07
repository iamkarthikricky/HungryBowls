/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
import {AiOutlineMinusCircle, AiOutlinePlusSquare} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItem, decrementCartItem} = value
      const {cartItem} = props
      const {id, imageUrl, name, quantity, cost} = cartItem

      const decreaseQuantity = () => {
        decrementCartItem(id)
      }

      const increaseQuantity = () => {
        incrementCartItem(id)
      }

      return (
        <li className="cart-item-container" testid="cartItem">
          <img src={imageUrl} alt={name} className="item-image" />
          <div className="item-container">
            <h1 className="item-name">{name}</h1>
            <div className="cart-button-container">
              <button
                type="type"
                className="cart-btn"
                testid="decrement-quantity"
                onClick={decreaseQuantity}
              >
                <AiOutlineMinusCircle size="20" />
              </button>
              <p className="active-quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                type="type"
                className="cart-btn"
                testid="increment-quantity"
                onClick={increaseQuantity}
              >
                <AiOutlinePlusSquare size="20" />
              </button>
            </div>
            <div className="cart-cost-container">
              <FaRupeeSign size="12px" />
              <p testid="price">{cost * quantity}</p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
