import {Switch, Route, Redirect} from 'react-router-dom'

import {Component} from 'react'
import Login from './components/LoginRoute/index'
import Home from './components/HomeRoute/index'
import Restaurant from './components/Restaurant'
import Cart from './components/Cart/index'
import NotFound from './components/NotFound/index'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index'

// eslint-disable-next-line spaced-comment

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/restaurant/:id" component={Restaurant} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
