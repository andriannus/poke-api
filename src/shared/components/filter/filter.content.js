import React, { useContext } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FilterContext from 'shared/components/filter/modules/filter.context';

import { LoaderFilter } from 'shared/components/loader';
import Modal from 'shared/components/modal';

const Content = () => {
  const { isShowModal } = useContext(FilterContext);

  return (
    <>
      <ButtonFilter />
      <ModalFilter isShowModal={isShowModal} />
    </>
  );
};

const ButtonFilter = () => {
  const { handleFilter } = useContext(FilterContext);

  return (
    <button
      className="button is-rounded"
      type="button"
      onClick={() => handleFilter()}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faFilter} />
      </span>
      <span>Type</span>
    </button>
  );
};

const ModalFilter = () => {
  const {
    isLoading,
    isShowModal,
    selectFilter,
    selectedOption,
    toggleModalFilter,
  } = useContext(FilterContext);

  if (!isShowModal) return null;

  return (
    <Modal>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Select Type</p>
        </header>

        <div className="card-content">
          {isLoading ? <LoaderFilter /> : <Options />}
        </div>

        <footer className="card-footer">
          <a className="card-footer-item" onClick={() => toggleModalFilter()}>
            Close
          </a>

          <a
            className="card-footer-item"
            onClick={() => selectFilter(selectedOption.url)}
          >
            OK
          </a>
        </footer>
      </div>
    </Modal>
  );
};

const Options = () => {
  const { filterData, selectOption, selectedOption } = useContext(
    FilterContext,
  );

  if (filterData.length < 1) return null;

  return (
    <div className="tags">
      {filterData.map(data => {
        return (
          <a
            key={data.name}
            className={`tag is-medium is-capitalized${
              data.name === selectedOption.name ? ' is-primary' : ''
            }`}
            onClick={() => selectOption(data)}
          >
            {data.name}
          </a>
        );
      })}
    </div>
  );
};

export default Content;
