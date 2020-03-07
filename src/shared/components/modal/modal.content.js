import React from 'react';

const Content = ({ content }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-content">{content}</div>
    </div>
  );
};

export default Content;
