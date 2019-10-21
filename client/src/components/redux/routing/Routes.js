import React from 'react';
import { Route, Switch } from 'react-router';

import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import CreateProfile from '../profile-forms/CreateProfile';
import Profiles from '../profiles/Profiles';
import Stories from '../stories/Stories';
import Story from '../story/Story';

const Routes = props => {
    return (
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/create-profile" component={CreateProfile} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/stories" component={Stories} />
            <Route exact path="/story" component={Story} />
        </Switch>
    )
}

export default Routes;