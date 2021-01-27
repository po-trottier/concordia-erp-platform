import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Layout, Card} from 'antd';

import {Routes} from "../../router/Routes";
import {NotFound} from '../../pages/NotFound';
import GuardedRoute from '../Router/GuardedRoute'
import { Login } from '../../pages/Login';

const {Content} = Layout;

export const AppContent = () => {
  return (
    <Content className="router-view">
      <Card>
        <div className="site-layout-background">
          <Switch>
            {Routes.filter(route => route.page !== Login).map((route, index) => (
              <GuardedRoute
                key={index}
                component={route.page}
                auth={route.auth}
                path={route.path}
                exact={route.exact} />
            ))}
            {/* Redirect home to dashboard */}
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={Login} />
            {/* Redirect any invalid page to the 404 page */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Card>
    </Content>
  );
}
