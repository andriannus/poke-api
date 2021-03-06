import React, { useContext } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeContext from 'pages/home/modules/home.context';

import {
  LoaderCount,
  LoaderDetail,
  LoaderList,
} from 'shared/components/loader';
import Modal from 'shared/components/modal';
import Filter from 'shared/components/filter';

const Content = () => {
  const {
    fetchFilterData,
    fetchFilteredPokemon,
    filterData,
    isLoading,
  } = useContext(HomeContext);

  return (
    <>
      <Banner />

      <div className="mx-2 my-2">
        <Filter
          filterData={filterData}
          isLoading={isLoading.fetchFilterData}
          onFilterOpened={fetchFilterData}
          onFilterSelected={fetchFilteredPokemon}
        />
      </div>

      <Pokemon />
      <ModalDetail />
    </>
  );
};

const Banner = () => {
  const { isLoading, paginatedPokemon } = useContext(HomeContext);
  const text = `${paginatedPokemon.count} Found`;

  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Pokemon</h1>

          <h2 className="subtitle">
            {isLoading.fetchPokemons ? <LoaderCount /> : text}
          </h2>
        </div>
      </div>
    </section>
  );
};

const Pokemon = () => {
  const { isLoading } = useContext(HomeContext);

  return (
    <>
      {isLoading.fetchPokemons ? <LoaderList /> : <PokemonList />}

      <LoadMoreButton />
    </>
  );
};

const LoadMoreButton = () => {
  const { fetchPaginatedPokemon, isLoading, paginatedPokemon } = useContext(
    HomeContext,
  );

  if (!paginatedPokemon.next) return null;
  if (isLoading.loadMore) return <LoaderList />;

  return (
    <div className="has-text-centered">
      <button
        className="button is-dark my-5"
        type="button"
        onClick={() => fetchPaginatedPokemon(paginatedPokemon.next)}
      >
        Load More
      </button>
    </div>
  );
};

const PokemonList = () => {
  const { fetchDetailedPokemon, paginatedPokemon } = useContext(HomeContext);

  return (
    <article className="panel is-shadowless is-radiusless mb-0">
      {paginatedPokemon.results.map(pokemon => {
        return (
          <a
            key={pokemon.name}
            className="panel-block is-capitalized is-radiusless py-3"
            onClick={() => fetchDetailedPokemon(pokemon.url)}
          >
            <span className="panel-icon">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>

            {pokemon.name}
          </a>
        );
      })}
    </article>
  );
};

const ModalDetail = () => {
  const {
    detailedPokemon,
    isLoading,
    isShowModal,
    toggleModalDetail,
  } = useContext(HomeContext);

  if (!isShowModal) return null;

  return (
    <Modal>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title is-capitalized">
            {isLoading.fetchPokemon ? <LoaderCount /> : detailedPokemon.name}
          </p>
        </header>

        <div className="card-content">
          {isLoading.fetchPokemon ? <LoaderDetail /> : <PokemonDetail />}
        </div>

        <footer className="card-footer">
          <a className="card-footer-item" onClick={() => toggleModalDetail()}>
            Close
          </a>
        </footer>
      </div>
    </Modal>
  );
};

const PokemonDetail = () => {
  const { detailedPokemon } = useContext(HomeContext);
  const { height, name, weight, sprites } = detailedPokemon;

  return (
    <div className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img alt={name} src={sprites.front_default} />
        </p>
      </figure>

      <div className="media-content">
        <div className="content">
          <p>
            <span className="has-text-weight-bold">Height: </span>
            {height}
          </p>

          <p>
            <span className="has-text-weight-bold">Weight: </span>
            {weight}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
