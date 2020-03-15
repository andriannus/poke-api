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
  const [paginatedPokemon, setPaginatedPokemon] = useState({
    count: 0,
    next: '',
    previous: '',
    results: [],
  });
  const [detailedPokemon, setDetailedPokemon] = useState({});
  const [filterData, setFilterData] = useState([]);

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

  const fetchFilterData = () => {
    const source = cancelToken.source();

    (async () => {
      try {
        const response = await baseApi.get('type', {
          cancelToken: source.token,
        });
        const { data } = response;

        setFilterData(data.results);
      } catch (error) {
        //
      }
    })();
  };

  const fetchFilteredPokemon = url => {
    setIsLoading({
      ...isLoading,
      fetchPokemons: true,
    });
    setPaginatedPokemon({
      next: '',
      previous: '',
      results: [],
    });

    const source = cancelToken.source();

    (async () => {
      try {
        const response = await baseApi.get(url, {
          cancelToken: source.token,
        });
        const { data } = response;
        const { pokemon } = data;

        const validatedPokemons = pokemon.map(poke => {
          return poke.pokemon;
        });

        setPaginatedPokemon({
          count: pokemon.length,
          next: '',
          previous: '',
          results: validatedPokemons,
        });
        setIsLoading({
          ...isLoading,
          fetchPokemons: false,
        });
      } catch (error) {
        setIsLoading({
          ...isLoading,
          fetchPokemons: false,
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
        fetchFilterData,
        fetchFilteredPokemon,
        fetchPaginatedPokemon,
        filterData,
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
