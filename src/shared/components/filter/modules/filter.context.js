import React from 'react';

const FilterContext = React.createContext({
  isShowModal: false,
  toggleModalFilter: () => {},
});

export default FilterContext;
