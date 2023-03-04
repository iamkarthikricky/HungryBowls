import {Link} from 'react-router-dom'
import './index.css'

import CartContext from '../../context/CartContext'

const PaymentSuccess = () => (
  <CartContext.Consumer>
    {value => {
      const {clearCartList} = value
      const onClearCart = () => {
        clearCartList()
      }
      return (
        <div className="payment-main-container">
          <img
            src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1677905140/Tasty-Kitchens/Vector_afe0az.png"
            alt="success"
            className="payment-success"
          />
          <h1 className="payment-success-heading">Payment Successful</h1>
          <p className="thanks-text">
            Thank you for ordering Your payment is successfully completed
          </p>
          <Link to="/">
            <button type="button" className="home-btn" onClick={onClearCart}>
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSuccess
