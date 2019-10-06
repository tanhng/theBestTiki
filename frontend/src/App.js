import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderWeb from './components/HeaderWeb';
import LoginPage from './components/LoginPage';
import HomeScreen from './components/HomeScreen';
import PostScreen from './components/PostScreen';
import RegisterPage from './components/RegisterPage';

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
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
