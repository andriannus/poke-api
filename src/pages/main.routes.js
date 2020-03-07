import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => {
  return import('pages/home');
});

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default withRouter(MainRoutes);
