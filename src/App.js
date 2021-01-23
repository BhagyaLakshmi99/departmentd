import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history'
import Login from './containers/Login'
import Department from './containers/Department'
import CreateDepartment from './containers/CreateDepartment'

export default function App() {
  return (
    <Router history={history}>

      <Switch>
        <Route
          exact
          path='/'
          component={Login}
        />
        <Route
          exact
          path='/departmentList'
          component={Department}
        />
        <Route exact path='/create' component={CreateDepartment} />
      </Switch>

    </Router>
  );
}
