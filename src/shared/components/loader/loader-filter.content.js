import React from 'react';
import ContentLoader from 'react-content-loader';

const Content = () => <LoaderList />;

const LoaderList = () => {
  return (
    <ContentLoader height={51} width={312}>
      <rect x="0" y="0" rx="5" ry="5" height="23" width="120" />
      <rect x="125" y="0" rx="5" ry="5" height="23" width="130" />
      <rect x="0" y="28" rx="5" ry="5" height="23" width="130" />
      <rect x="135" y="28" rx="5" ry="5" height="23" width="120" />
    </ContentLoader>
  );
};

export default Content;
