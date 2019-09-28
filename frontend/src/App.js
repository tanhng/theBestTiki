import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderWeb from './components/HeaderWeb';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostScreen from './components/PostScreen';

export default class App extends Component {
  render() {
    return (
      <div>
        <HeaderWeb />
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/new-post' component={PostScreen}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
