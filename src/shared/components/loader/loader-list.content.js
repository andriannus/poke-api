import React from 'react';
import ContentLoader from 'react-content-loader';

const Content = () => <LoaderList />;

const LoaderList = () => {
  return (
    <div className="mx-3 my-3">
      <ContentLoader height={175} width={456}>
        <rect x="0" y="0" width="480" height="40" />
        <rect x="0" y="45" width="480" height="40" />
        <rect x="0" y="90" width="480" height="40" />
        <rect x="0" y="135" width="480" height="40" />
      </ContentLoader>
    </div>
  );
};

export default Content;
