import React, { useEffect, useState } from 'react';

import HomeContent from 'pages/home/home.content';
import HomeContext from 'pages/home/modules/home.context';

import useAxios from 'shared/services/axios.hook';

const Home = () => {
  const { baseApi, cancelToken } = useAxios();

  const [isLoading, setIsLoading] = useState(true);
  const [paginatedPokemon, setPaginatedPokemon] = useState({});

  const fetchPaginatedPokemon = url => {
    const source = cancelToken.source();
    const baseUrl = url || 'pokemon';

    (async () => {
      try {
        const response = await baseApi.get(baseUrl, {
          cancelToken: source.token,
        });
        const { data } = response;

        if (!url) {
          setPaginatedPokemon(data);
          setIsLoading(false);
          return;
        }

        const updatedResults = [...paginatedPokemon.results, ...data.results];

        setPaginatedPokemon({
          ...data,
          results: updatedResults,
        });
        setIsLoading(false);
      } catch (error) {
        setPaginatedPokemon({});
        setIsLoading(false);
      }
    })();
  };

  useEffect(() => {
    fetchPaginatedPokemon();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        isLoading,
        paginatedPokemon,
        fetchPaginatedPokemon,
      }}
    >
      <HomeContent />
    </HomeContext.Provider>
  );
};

export default Home;
