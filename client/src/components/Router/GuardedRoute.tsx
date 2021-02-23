import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Role } from '../../router/Roles';
import { NoPermissions } from '../../pages/NoPermissions';
import { RootState } from '../../store/Store';

const hasPermissions = (auth : Role[], userAuthType : Role) : boolean => {
  let hasPerms = false;
  auth.forEach((guard : Role) => {
    if (guard === userAuthType || guard === Role.ANY) {
      hasPerms = true;
      return;
    }
  });
  return hasPerms;
};

const GuardedRoute = ({ component: Component, auth, path, exact } :
  {
    component : React.ComponentType<any>,
    auth : Role[],
    path : string,
    exact : boolean
  }) => {

  const user = useSelector((state : RootState) => state.user.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      !user.isLoggedIn ? <Redirect to={'/login?redirect=' + path.substring(1)} /> :
        hasPermissions(auth, user.authType)
          ? <Component {...props} />
          : <NoPermissions />
    )} />
  );
};

export default GuardedRoute;
