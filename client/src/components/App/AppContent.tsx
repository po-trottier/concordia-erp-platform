import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Card, Layout } from 'antd';

import { Routes } from '../../router/Routes';
import { NotFound } from '../../pages/NotFound';
import GuardedRoute from '../Router/GuardedRoute';

const { Content } = Layout;

export const AppContent = () => {
  return (
    <Content className='router-view'>
      <Card>
        <div className='site-layout-background'>
          <Switch>
            {Routes.map((route, index) => (
              <GuardedRoute
                key={index}
                component={route.page}
                auth={route.auth}
                path={route.path}
                exact={route.exact} />
            ))}
            {/* Redirect home to home */}
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            {/* Redirect any invalid page to the 404 page */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Card>
    </Content>
  );
};
