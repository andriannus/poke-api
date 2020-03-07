import React from 'react';
import ContentLoader from 'react-content-loader';

const Content = () => <LoaderList />;

const LoaderList = () => {
  return (
    <ContentLoader height={23} width={140}>
      <rect x="0" y="0" rx="5" ry="5" height="23" width="140" />
    </ContentLoader>
  );
};

export default Content;
