import React from 'react';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Content = ({ onBackToTop }) => {
  return (
    <button
      id="BtnBackToTop"
      className="button is-dark is-medium"
      type="button"
      onClick={onBackToTop}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faChevronCircleUp} />
      </span>
    </button>
  );
};

export default Content;
