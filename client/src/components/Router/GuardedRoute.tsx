import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RouteGuard } from '../../router/RouteGuards'

const hasPermissions = (auth : RouteGuard[]) : boolean => {
  let valid = false;

  auth.forEach((guard: RouteGuard) => {
    if (guard === RouteGuard.ANY) {
      valid = true;
      return;
    }
    // if (guard === CurrentUser.auth)
      // valid = true;
      // return;
  });
  return valid;
}

const GuardedRoute = ({ component: Component, auth, path, exact } :
  {
    component : React.ComponentType<any>,
    auth: RouteGuard[],
    path: string,
    exact: boolean
  }) => (
  <Route path={path} exact={exact} render={(props) => (
    hasPermissions(auth)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/no-permissions',
        state: { auth: auth }
      }} />
  )} />
)

export default GuardedRoute;
