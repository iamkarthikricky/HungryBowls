/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OffersView extends Component {
  state = {offersApiStatus: apiStatusConstants.initial, offerList: []}

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({offersApiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedOffers = fetchedData.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      this.setState({
        offerList: updatedOffers,
        offersApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({offersApiStatus: apiStatusConstants.failure})
    }
  }

  renderOffers = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    const {offerList} = this.state
    return (
      <ul className="header-ul-list">
        <Slider {...settings} className="slider">
          {offerList.map(eachOffer => (
            <li key={eachOffer.id}>
              <img
                src={eachOffer.imageUrl}
                alt="offer"
                className="offer-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#010101" height="100" width="25" />
    </div>
  )

  renderOfferView = () => {
    const {offersApiStatus} = this.state
    switch (offersApiStatus) {
      case apiStatusConstants.success:
        return this.renderOffers()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="offers-container" testid="restaurants-offers-loader">
        {this.renderOfferView()}
      </div>
    )
  }
}

export default OffersView
