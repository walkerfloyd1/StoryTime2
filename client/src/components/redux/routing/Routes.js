import React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './PrivateRoute';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import Profiles from '../profiles/Profiles';
import Stories from '../stories/Stories';
import Story from '../story/Story';
import NotFound from '../layout/NotFound';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';

const Routes = props => {
    return (
        <Switch>
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/profiles" component={Profiles} />
            <PrivateRoute exact path="/stories" component={Stories} />
            <PrivateRoute exact path="/stories/:id" component={Story} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes;