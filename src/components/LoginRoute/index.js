import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showError, errorMsg} = this.state

    return (
      <div className="login-main-container">
        <img
          src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1667365033/Tasty-Kitchens/welcome-img-small_t6uw1a.png"
          alt="welcome logo"
          className="app-image-small"
        />

        <form className="form-container" onSubmit={this.onFormSubmit}>
          <div className="login-large-view">
            <img
              src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1667564911/Tasty-Kitchens/VectorlandingImage_jjynow.png"
              alt="website logo"
            />
            <h1 className="app-name">Tasty Kitchens</h1>
          </div>
          <h1 className="login-main-heading">Login</h1>
          <label htmlFor="usernameMobile" className="label-text">
            USERNAME
          </label>
          <input
            type="text"
            id="usernameMobile"
            className="input-text"
            value={username}
            onChange={this.onUserNameChange}
          />
          <label htmlFor="passwordMobile" className="label-text">
            PASSWORD
          </label>
          <input
            type="password"
            id="passwordMobile"
            className="input-text"
            value={password}
            onChange={this.onPasswordChange}
          />
          {showError ? <p className="error-msg">{errorMsg}</p> : ''}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <img
          src="https://res.cloudinary.com/dlwydxzdi/image/upload/v1667365073/Tasty-Kitchens/welcome-img-large_p3iwai.png"
          alt="website login"
          className="app-image-large"
        />
      </div>
    )
  }
}

export default Login
