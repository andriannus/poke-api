import React from 'react';

const FilterContext = React.createContext({
  filterData: {},
  isLoading: false,
  isShowModal: false,
  selectedOption: {
    name: '',
    url: '',
  },
  handleFilter: () => {},
  selectFilter: () => {},
  selectOption: () => {},
  toggleModalFilter: () => {},
});

export default FilterContext;
