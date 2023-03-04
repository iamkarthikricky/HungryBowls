/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import NavBar from '../NavBar'
import MenuItem from '../MenuItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Restaurant extends Component {
  state = {
    restaurantDetailsApiStatus: apiStatusConstants.initial,
    foodItemsList: [],
    restaurantBanner: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({restaurantDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const restaurantBannerData = {
        imageUrl: fetchedData.image_url,
        name: fetchedData.name,
        cuisine: fetchedData.cuisine,
        location: fetchedData.location,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
        costForTwo: fetchedData.cost_for_two,
        itemsCount: fetchedData.items_count,
        opensAt: fetchedData.opens_at,
      }
      const itemDetails = fetchedData.food_items.map(foodItem => ({
        cost: foodItem.cost,
        foodType: foodItem.food_type,
        id: foodItem.id,
        imageUrl: foodItem.image_url,
        name: foodItem.name,
        rating: foodItem.rating,
      }))
      this.setState({
        restaurantBanner: restaurantBannerData,
        foodItemsList: itemDetails,
        restaurantDetailsApiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantBanner, foodItemsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantBanner
    return (
      <>
        <NavBar />
        <div className="restaurant-banner-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-banner-image"
          />
          <div className="restaurant-info">
            <h1 className="restaurant-banner-name">{name}</h1>
            <p className="restaurant-banner-cuisine">{cuisine}</p>
            <p className="restaurant-banner-cuisine">{location}</p>
            <div className="restaurant-info-rating-container">
              <div className="rating-main-container">
                <div className="rating-container">
                  <BsStarFill color="#ffffff" size="18px" />
                  <p className="restaurant-info-rating">{rating}</p>
                </div>
                <div className="rating-container">
                  <p className="restaurant-reviews-count">{reviewsCount}</p>
                  <p className="restaurant-reviews-count">+Ratings</p>
                </div>
              </div>
              <div className="rating-main-sub-container">
                <div className="rating-container">
                  <BiRupee color="#ffffff" size="18px" />
                  <p className="restaurant-info-rating">{costForTwo}</p>
                </div>
                <p className="restaurant-reviews-count">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-items-container">
          <ul className="restaurant-items-list">
            {foodItemsList.map(eachFoodItem => (
              <MenuItem key={eachFoodItem.id} foodItem={eachFoodItem} />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#010101" height="100" width="25" />
    </div>
  )

  renderRestaurant = () => {
    const {restaurantDetailsApiStatus} = this.state
    switch (restaurantDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurant()}</>
  }
}

export default Restaurant
