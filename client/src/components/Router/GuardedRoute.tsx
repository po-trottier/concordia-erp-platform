import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RouteGuard } from '../../router/RouteGuards';
import { NoPermissions } from '../../pages/NoPermissions';
import { RootState } from '../../store/Store';

const hasPermissions = (auth : RouteGuard[], userAuthType : RouteGuard, isLoggedIn : boolean, path : string) : boolean => {

  auth.forEach((guard : RouteGuard) => {
    if (guard !== userAuthType && guard !== RouteGuard.ANY) {
      return false;
    }
  });
  return true;
};

const GuardedRoute = ({ component: Component, auth, path, exact } :
  {
    component : React.ComponentType<any>,
    auth : RouteGuard[],
    path : string,
    exact : boolean
  }) => {

  const user = useSelector((state : RootState) => state.user.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      !user.isLoggedIn ? <Redirect to={'/login?redirect=' + path.substring(1)} /> :
        hasPermissions(auth, user.authType, user.isLoggedIn, path)
          ? <Component {...props} />
          : <NoPermissions />
    )} />
  );
};

export default GuardedRoute;
