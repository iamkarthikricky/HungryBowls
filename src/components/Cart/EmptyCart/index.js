import {Link} from 'react-router-dom'
import './index.css'

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

export default EmptyCartView
