import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Layout, Card} from 'antd';

import {Routes} from "../../router/Routes";
import {NotFound} from '../../pages/NotFound';

const {Content} = Layout;

export const RouterView = () => {
  return (
    <Content className="router-view">
      <Card>
        <div className="site-layout-background">
          <Switch>
            {Routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page} />
            ))}
            {/* Redirect home to dashboard */}
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            {/* Redirect any invalid page to the 404 page */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Card>
    </Content>
  );
}
