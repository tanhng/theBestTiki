import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderWeb from './components/HeaderWeb';
import LoginPage from './components/LoginPage';
import HomeScreen from './components/HomeScreen';
import PostScreen from './components/PostScreen';
import RegisterPage from './components/RegisterPage';
import CartScreen from './components/CartScreen';
import SearchScreen from './components/SearchScreen';
export default class App extends Component {
  render() {
    return (
      <div>
        <HeaderWeb />
        <BrowserRouter>
          <Switch>
            <Route path='/' component={HomeScreen} exact={true} />
            <Route path='/login' component={LoginPage} />
            <Route path='/new-post' component={PostScreen} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/cart' component={CartScreen} />
            <Route path='/search' component={SearchScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
