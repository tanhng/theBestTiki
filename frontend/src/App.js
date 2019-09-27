import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderWeb from './components/HeaderWeb';

export default class App extends Component {
  render() {
    return (
      <div>
        <HeaderWeb />
        <BrowserRouter>
          <Switch>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
