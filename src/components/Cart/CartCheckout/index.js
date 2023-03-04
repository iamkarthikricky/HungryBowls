import {Component} from 'react'
import PaymentSuccess from '../../Payment'
import CartItem from '../CartItem/index'
import CheckoutTotal from '../CheckoutTotal/index'

import './index.css'
import CartContext from '../../../context/CartContext'

class CartCheckout extends Component {
  state = {isOrderPlaced: false}

  placeOrder = () => {
    this.setState(preValue => ({
      isOrderPlaced: !preValue.isOrderPlaced,
    }))
  }

  render() {
    const {isOrderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const stringifiedCartList = localStorage.getItem('cartData')
          const parsedCartList = JSON.parse(stringifiedCartList)
          return isOrderPlaced ? (
            <PaymentSuccess />
          ) : (
            <div className="cart-main-container">
              <ul className="cart-ul-list">
                {parsedCartList.map(eachItem => (
                  <CartItem key={eachItem.id} cartItem={eachItem} />
                ))}
              </ul>
              <CheckoutTotal checkout={this.placeOrder} value={value} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartCheckout
