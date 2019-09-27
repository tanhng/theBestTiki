import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderWeb from './components/HeaderWeb';
import LoginPage from './components/LoginPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <HeaderWeb />
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
