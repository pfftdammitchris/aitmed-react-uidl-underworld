import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyle from './app/GlobalStyle'
import App from './App'
import AppProvider from './AppProvider'
import AuthProvider from './AuthProvider'
import * as serviceWorker from 'serviceWorker'

ReactDOM.render(
  <>
    <GlobalStyle />
    <AuthProvider>
      <AppProvider>
        <Router>
          <Switch>
            <Route path="/" component={App} exact />
            <Route path="/:page" component={App} />
          </Switch>
        </Router>
      </AppProvider>
    </AuthProvider>
  </>,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
