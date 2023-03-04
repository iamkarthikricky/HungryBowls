/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {
  AiFillStar,
  AiOutlineMinusCircle,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

class MenuItem extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addToCart, incrementCartItem, decrementCartItem} = value

          const {foodItem} = this.props
          const {id, cost, imageUrl, name, rating} = foodItem
          const {quantity} = this.state

          const onDecrementClick = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItem(id)
          }

          const onIncrementClick = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementCartItem(id)
          }

          const onClickAdd = () => {
            this.setState(
              prevState => ({quantity: prevState.quantity + 1}),
              addToCart({...foodItem, quantity: quantity + 1}),
            )
          }
          return (
            <li className="food-details-main-container" testid="foodItem">
              <img src={imageUrl} alt="food-item" className="food-item-image" />
              <div className="food-item-details-container ">
                <h1 className="food-item-name">{name}</h1>
                <div className="rating-container">
                  <BiRupee size="16" />
                  <p className="food-item-cost">{cost}</p>
                  <span className="food-item-cost">.00</span>
                </div>
                <div className="rating-container">
                  <AiFillStar size="16" color="#FFCC00" />
                  <p className="food-rating">{rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={onClickAdd}
                  >
                    Add
                  </button>
                ) : (
                  <div className="cart-btn-container">
                    <button
                      type="type"
                      className="cart-btn"
                      testid="decrement-count"
                      onClick={onDecrementClick}
                    >
                      <AiOutlineMinusCircle size="20" />
                    </button>
                    <p className="active-quantity" testid="active-count">
                      {quantity}
                    </p>
                    <button
                      type="type"
                      className="cart-btn"
                      testid="increment-count"
                      onClick={onIncrementClick}
                    >
                      <AiOutlinePlusSquare size="20" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default MenuItem
