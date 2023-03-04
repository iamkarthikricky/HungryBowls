import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  clearCartList: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
})

export default CartContext
