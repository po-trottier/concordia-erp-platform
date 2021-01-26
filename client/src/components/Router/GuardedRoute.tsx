import React from 'react';
import {Route, useHistory, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RouteGuard} from '../../router/RouteGuards';
import {NoPermissions} from '../../pages/NoPermissions';
import {RootState} from '../../app/Store'

const hasPermissions = (auth : RouteGuard[], userAuthType: RouteGuard, isLoggedIn : boolean, path : string, history : any) : boolean => {

  let valid = false;

  if (!isLoggedIn){
    history.replace('/dashboard?redirect={path.substring(1)}');
  }

  // TODO: Check if user is logged in.
  // Otherwise redirect to the login page.
  // history.replace('/login?redirect={path.substring(1)}');

  auth.forEach((guard: RouteGuard) => {
    if (guard === userAuthType || guard === RouteGuard.ANY) {
      valid = true;
      return;
    }
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

  const user = useSelector((state : RootState) => state.user.user);

  const userAuthType = user.authType;

  const isLoggedIn = user.isLoggedIn;

  return (
    <Route path={path} exact={exact} render={(props) => (
      hasPermissions(auth, userAuthType, isLoggedIn, path, history)
        ? <Component {...props} />
        : <NoPermissions />
    )} />
  )
}

export default GuardedRoute;
