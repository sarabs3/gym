import React from 'react';
import { Switch, Route} from 'react-router-dom';
import PrivateRoute from "./routes/protectedRoute";

// Lazy load components
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import UnProtectedRoute from "./routes/unProtectedRoute";
import { Home } from "./containers/Home";
import { Plans, PlansList, AddPlan } from "./containers/plans";
import { Exercise } from './containers/Exercise';
import { Workout, AddWorkout } from './containers/workouts';

export default (props) => (
  <Route render={({location}) => (
        <Switch location={location}>
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={PrivateRoute} />
          <UnProtectedRoute path="/login" component={Login}  />
          <UnProtectedRoute path="/plans/details/:id" component={Exercise}  />
          <Route path="/plans/add" component={AddPlan}  />
          <Route path="/plans/:id" component={Plans}  />
          <Route path="/plans/" component={PlansList}  />
          <Route path="/Workout/" component={AddWorkout}  />
          <Route path="/workouts/" component={Workout}  />
          <UnProtectedRoute path="/" component={Home}  />
        </Switch>
  )} />
);

