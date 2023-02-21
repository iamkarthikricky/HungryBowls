/* eslint-disable react/button-has-type */
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1675166462/Tasty-Kitchens/erroring_1notfound_iepoge.png"
      alt="not found"
      className="not-found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found.
    </p>
    <p className="not-found-para">Please go back to the home page</p>
    <Link to="/">
      <button type="button" className="logout-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
