import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './styles/App.css';

import Landing from './components/redux/layout/Landing';
import Dashboard from './components/redux/dashboard/Dashboard';
import Login from './components/redux/auth/Login';
import Register from './components/redux/auth/Register';
import Profile from './components/redux/profile/Profile';
import CreateProfile from './components/redux/profile-forms/CreateProfile';
import Profiles from './components/redux/profiles/Profiles';
import Stories from './components/redux/stories/Stories';
import Story from './components/redux/story/Story';

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
      <Route exact path="/" component={Landing} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/signin" component={Login} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create-profile" component={CreateProfile} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/stories" component={Stories} />
      <Route exact path="/story" component={Story} />
    </Router>
    </Provider>
  )
}

export default App;
