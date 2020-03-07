import React, { useEffect, useState } from 'react';

import HomeContent from 'pages/home/home.content';
import HomeContext from 'pages/home/modules/home.context';

import useAxios from 'shared/services/axios.hook';

const Home = () => {
  const { baseApi, cancelToken } = useAxios();

  const [isLoading, setIsLoading] = useState({
    fetchPokemon: false,
    fetchPokemons: true,
    loadMore: false,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [paginatedPokemon, setPaginatedPokemon] = useState({});
  const [detailedPokemon, setDetailedPokemon] = useState({});

  const toggleModalDetail = () => {
    const html = document.getElementsByTagName('html')[0];
    const className = 'is-clipped';

    setIsShowModal(!isShowModal);

    if (isShowModal) {
      html.classList.remove(className);
    } else {
      html.classList.add(className);
    }
  };

  const fetchPaginatedPokemon = url => {
    const source = cancelToken.source();
    const baseUrl = url || 'pokemon';

    if (url) {
      setIsLoading({
        ...isLoading,
        loadMore: true,
      });
    }

    (async () => {
      try {
        const response = await baseApi.get(baseUrl, {
          cancelToken: source.token,
        });
        const { data } = response;

        if (!url) {
          setPaginatedPokemon(data);
          setIsLoading({
            ...isLoading,
            fetchPokemons: false,
          });
          return;
        }

        const updatedResults = [...paginatedPokemon.results, ...data.results];

        setPaginatedPokemon({
          ...data,
          results: updatedResults,
        });
        setIsLoading({
          ...isLoading,
          loadMore: false,
        });
      } catch (error) {
        setPaginatedPokemon({});
        setIsLoading({
          ...isLoading,
          fetchPokemons: false,
        });
      }
    })();
  };

  const fetchDetailedPokemon = url => {
    setIsLoading({
      ...isLoading,
      fetchPokemon: true,
    });
    toggleModalDetail();

    const source = cancelToken.source();

    (async () => {
      try {
        const response = await baseApi.get(url, {
          cancelToken: source.token,
        });
        const { data } = response;

        setDetailedPokemon(data);
        setIsLoading({
          ...isLoading,
          fetchPokemon: false,
        });
      } catch (error) {
        setIsLoading({
          ...isLoading,
          fetchPokemon: false,
        });
      }
    })();
  };

  useEffect(() => {
    fetchPaginatedPokemon();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        fetchDetailedPokemon,
        fetchPaginatedPokemon,
        detailedPokemon,
        isLoading,
        isShowModal,
        paginatedPokemon,
        toggleModalDetail,
      }}
    >
      <HomeContent />
    </HomeContext.Provider>
  );
};

export default Home;
