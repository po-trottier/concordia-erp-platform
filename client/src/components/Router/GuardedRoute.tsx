import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {RouteGuard} from '../../router/RouteGuards';
import {NoPermissions} from '../../pages/NoPermissions';

const hasPermissions = (auth : RouteGuard[], path : string, history : any) : boolean => {
  let valid = false;

  // TODO: Check if user is logged in.
  // Otherwise redirect to the login page.
  // history.replace('/login?redirect={path.substring(1)}');

  auth.forEach((guard: RouteGuard) => {
    if (guard === RouteGuard.ANY) {
      valid = true;
      return;
    }
    // TODO: Check for current user permissions
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
  }) => {
  const history = useHistory();

  return (
    <Route path={path} exact={exact} render={(props) => (
      hasPermissions(auth, path, history)
        ? <Component {...props} />
        : <NoPermissions />
    )} />
  )
}

export default GuardedRoute;
