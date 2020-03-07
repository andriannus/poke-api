import React from 'react';
import ContentLoader from 'react-content-loader';

const Content = () => <LoaderDetail />;

const LoaderDetail = () => {
  return (
    <ContentLoader height={66} width={592}>
      <rect x="0" y="0" rx="3" ry="3" width="64" height="64" />
      <rect x="74" y="0" rx="5" ry="5" height="23" width="100" />
      <rect x="74" y="38" rx="5" ry="5" height="23" width="120" />
    </ContentLoader>
  );
};

export default Content;
