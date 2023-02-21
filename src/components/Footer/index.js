import {Component} from 'react'

import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-logo-container">
          <img
            src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1667901701/Tasty-Kitchens/logo_footer_krnami.png"
            alt="website-footer-logo"
          />
          <h1 className="footer-heading">Tasty Kitchens</h1>
        </div>
        <p className="footer-description">
          The only thing we are serious about is food. Contact us on
        </p>
        <div className="footer-logo-container">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="social-icon"
          />
          <FaInstagram testid="instagram-social-icon" className="social-icon" />
          <FaTwitter testid="twitter-social-icon" className="social-icon" />
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="social-icon"
          />
        </div>
      </div>
    )
  }
}

export default Footer
