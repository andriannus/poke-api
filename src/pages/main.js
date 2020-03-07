import React from 'react';
import loadable from '@loadable/component';

import MainRoutes from 'pages/main.routes';

const Navbar = loadable(() => {
  return import('shared/components/navbar');
});

const Main = () => {
  return (
    <>
      <Navbar />

      <div id="Main" className="container has-background-white">
        <MainRoutes />
      </div>
    </>
  );
};

export default Main;
