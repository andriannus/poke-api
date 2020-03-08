import React from 'react';
import loadable from '@loadable/component';

import MainRoutes from 'pages/main.routes';

const Navbar = loadable(() => {
  return import('shared/components/navbar');
});

const ButtonBackToTop = loadable(() => {
  return import('shared/components/button-to-top');
});

const Main = () => {
  return (
    <>
      <Navbar />

      <div id="Main" className="container has-background-white">
        <MainRoutes />
      </div>

      <ButtonBackToTop />
    </>
  );
};

export default Main;
