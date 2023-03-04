/* eslint-disable no-unused-vars */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import CartCheckout from './CartCheckout/index'

import './index.css'
import CartContext from '../../context/CartContext'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1677904082/Tasty-Kitchens/cooking_1cooking_yxvfhk.png"
      alt="empty cart"
      className="cooking-image"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-para">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="logout-btn">
        Order Now
      </button>
    </Link>
  </div>
)

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          return (
            <>
              <NavBar />
              {cartList.length === 0 ? <EmptyCartView /> : <CartCheckout />}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
