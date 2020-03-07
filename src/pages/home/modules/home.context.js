import React from 'react';

const HomeContext = React.createContext({
  detailedPokemon: {},
  isLoading: {
    fetchPokemon: false,
    fetchPokemons: true,
    loadMore: false,
  },
  isShowModal: false,
  paginatedPokemon: {},
  fetchDetailedPokemon: () => {},
  fetchPaginatedPokemon: () => {},
  toggleModalDetail: () => {},
});

export default HomeContext;
