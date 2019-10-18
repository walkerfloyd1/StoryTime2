import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './styles/App.css';

import Landing from './redux/layout/Landing';
import Dashboard from './redux/dashboard/Dashboard';
import Login from './redux/auth/Login';
import Register from './redux/auth/Register';
import Profile from './redux/profile/Profile';
import CreateProfile from './redux/profile-forms/CreateProfile';
import Profiles from './redux/profiles/Profiles';
import Stories from './redux/stories/Stories';
import Story from './redux/story/Story';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create-profile" component={CreateProfile} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/stories" component={Stories} />
      <Route exact path="/story" component={Story} />
    </Router>
  )
}

export default App;
