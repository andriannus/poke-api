import React from 'react';

const HomeContext = React.createContext({
  fetchPaginatedPokemon: () => {},
  isLoading: false,
  paginatedPokemon: {},
});

export default HomeContext;
