/* eslint-disable react/no-unknown-property */
import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../../context/CartContext'

import './index.css'

const CheckoutTotal = props => {
  const {checkout} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        let checkoutTotal = 0
        cartList.forEach(eachCartItem => {
          checkoutTotal += eachCartItem.cost * eachCartItem.quantity
        })

        const onPlaceOrderClick = () => {
          checkout()
        }

        return (
          <div className="price-main-container">
            <div className="flex-row-container">
              <h1 className="order-total">Order Total:</h1>
              <div className="cart-btn-container">
                <FaRupeeSign size="24px" />
                <p className="order-total-price" testid="total-price">
                  {checkoutTotal}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onPlaceOrderClick}
              className="place-order-btn"
            >
              Place Order
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CheckoutTotal
