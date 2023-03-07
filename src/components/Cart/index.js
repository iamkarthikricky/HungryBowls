/* eslint-disable no-unused-vars */
import {Component} from 'react'
import NavBar from '../NavBar'
import CartCheckout from './CartCheckout/index'

import EmptyCartView from './EmptyCart/index'

import CartContext from '../../context/CartContext'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const isCartEmpty = cartList.length === 0
          return (
            <>
              <NavBar />
              {isCartEmpty ? <EmptyCartView /> : <CartCheckout />}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
