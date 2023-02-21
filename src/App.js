import {Switch, Route, Redirect} from 'react-router-dom'

import {Component} from 'react'
import Login from './components/LoginRoute/index'
import Home from './components/HomeRoute/index'
import NotFound from './components/NotFound/index'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index'

// eslint-disable-next-line spaced-comment
/*const sortByOptions = [
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
] */

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
