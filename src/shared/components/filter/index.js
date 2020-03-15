import React, { useState } from 'react';

import FilterContent from 'shared/components/filter/filter.content';
import FilterContext from 'shared/components/filter/modules/filter.context';

const Filter = ({
  filterData,
  isLoading,
  onFilterOpened,
  onFilterSelected,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: '',
    url: '',
  });

  const toggleModalFilter = () => {
    setIsShowModal(!isShowModal);
  };

  const handleFilter = () => {
    toggleModalFilter();
    onFilterOpened();
  };

  const selectOption = option => {
    setSelectedOption(option);
  };

  const selectFilter = url => {
    onFilterSelected(url);
    toggleModalFilter();
  };

  return (
    <FilterContext.Provider
      value={{
        filterData,
        handleFilter,
        isLoading,
        isShowModal,
        selectFilter,
        selectOption,
        selectedOption,
        toggleModalFilter,
      }}
    >
      <FilterContent />
    </FilterContext.Provider>
  );
};

export default Filter;
