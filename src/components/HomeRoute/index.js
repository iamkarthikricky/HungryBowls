/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {
  MdOutlineSort,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'

import {AiFillStar} from 'react-icons/ai'
import NavBar from '../NavBar/index'
import OffersView from '../OffersView/index'
import Footer from '../Footer/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
const RestaurantCard = props => {
  const {restaurantDetail} = props
  const {imageUrl, name, cuisine, userRating} = restaurantDetail
  const {rating, totalReviews} = userRating
  return (
    <li testid="restaurant-item" className="restaurant-list-item ">
      <img src={imageUrl} alt="restaurant" className="restaurant-image" />
      <div className="restaurant-content-container">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-cuisine">{cuisine}</p>
        <div className="restaurant-rating-container">
          <AiFillStar color="#FFCC00" size="12px" />
          <p className="restaurant-rating">{rating}</p>
          <p className="restaurant-reviews">({totalReviews} ratings)</p>
        </div>
      </div>
    </li>
  )
}

class Home extends Component {
  state = {
    RestaurantsList: [],
    sortOption: sortByOptions[1].value,
    restaurantsApiStatus: apiStatusConstants.initial,
    activePage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  onLeftBtnClick = () => {
    const {activePage} = this.state
    if (activePage <= 1) {
      this.setState(preValue => ({activePage: preValue.activePage}))
    } else {
      this.setState(
        preValue => ({activePage: preValue.activePage - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onRightBtnClick = () => {
    const {activePage, totalPages} = this.state
    if (activePage === totalPages) {
      this.setState(preValue => ({activePage: preValue.activePage}))
    } else {
      this.setState(
        preValue => ({activePage: preValue.activePage + 1}),
        this.getRestaurantsList,
      )
    }
  }

  onSortOptionChange = event => {
    this.setState({sortOption: event.target.value}, this.getRestaurantsList)
  }

  getRestaurantsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({restaurantsApiStatus: apiStatusConstants.inProgress})
    const {sortOption, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        cuisine: eachItem.cuisine,
        userRating: {
          rating: eachItem.user_rating.rating,
          totalReviews: eachItem.user_rating.total_reviews,
        },
      }))
      const totalPages = fetchedData.total % 9
      this.setState({
        RestaurantsList: updatedData,
        restaurantsApiStatus: apiStatusConstants.success,
        totalPages,
      })
    } else {
      this.setState({restaurantsApiStatus: apiStatusConstants.failure})
    }
  }

  renderRestaurantsView = () => {
    const {RestaurantsList, activePage, totalPages, sortOption} = this.state

    return (
      <div>
        <div className="restaurant-container">
          <div className="restaurant-name-container">
            <div>
              <h1 className="main-heading">Popular Restaurants</h1>
              <p className="main-para">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>

            <div className="sort-dropdown-container">
              <label htmlFor="sort-option">
                <MdOutlineSort size="24" />
              </label>
              <select
                id="sort-option"
                className="sort-dropdown"
                value={sortOption}
                onChange={this.onSortOptionChange}
              >
                {sortByOptions.map(eachItem => (
                  <option key={eachItem.id} value={eachItem.value}>
                    Sort by {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="restaurant-ul-list ">
            {RestaurantsList.map(eachItem => (
              <RestaurantCard key={eachItem.id} restaurantDetail={eachItem} />
            ))}
          </ul>
          <div className="pagination-btn-container">
            <button
              testid="pagination-left-button"
              className="pagination-btn"
              onClick={this.onLeftBtnClick}
            >
              <MdKeyboardArrowLeft />
            </button>
            <span testid="active-page-number" className="page-number">
              {activePage} of {totalPages}
            </span>
            <button
              testid="pagination-right-button"
              className="pagination-btn"
              onClick={this.onRightBtnClick}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#010101" height="100" width="25" />
    </div>
  )

  renderRestaurants = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <NavBar />
        <div className="home-container">
          <OffersView />
          {this.renderRestaurants()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
