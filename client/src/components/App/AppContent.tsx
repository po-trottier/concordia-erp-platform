import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Card, Layout } from 'antd';

import { Routes } from '../../router/Routes';
import { NotFound } from '../../pages/NotFound';
import GuardedRoute from '../Router/GuardedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';

const { Content } = Layout;

export const AppContent = () => {

  const useForceUpdate = () => {
    const [, forceUpdate] = React.useState(true);
    return React.useCallback(() => {
      forceUpdate(s => !s);
    }, []);
  };
  const forceUpdate = useForceUpdate();

  const selected = useSelector((state : RootState) => state.location.selected);

  useEffect(() => {
    forceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
