import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './styles/App.css';

import Login from './components/redux/auth/Login';
import Register from './components/redux/auth/Register';
import Routes from './components/redux/routing/Routes';
import Navbar from './components/redux/layout/Navbar';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
      <Navbar />
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Register} />
      <Route component={Routes} />
      </Fragment>
    </Router>
    </Provider>
  )
}

export default App;
