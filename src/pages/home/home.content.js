import React, { useContext } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeContext from 'pages/home/modules/home.context';

const Content = () => {
  return (
    <>
      <Banner />
      <Pokemon />
    </>
  );
};

const Banner = () => {
  const { isLoading, paginatedPokemon } = useContext(HomeContext);

  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Pokemon</h1>

          <h2 className="subtitle">
            {isLoading ? '' : `${paginatedPokemon.count} Found`}
          </h2>
        </div>
      </div>
    </section>
  );
};

const Pokemon = () => {
  const { fetchPaginatedPokemon, paginatedPokemon } = useContext(HomeContext);

  return (
    <>
      <article className="panel is-radiusless">
        <PokemonList />
      </article>

      <div className="has-text-centered">
        <button
          className="button is-dark"
          type="button"
          onClick={() => fetchPaginatedPokemon(paginatedPokemon.next)}
        >
          Load More
        </button>
      </div>
    </>
  );
};

const PokemonList = () => {
  const { isLoading, paginatedPokemon } = useContext(HomeContext);

  return (
    <>
      {isLoading
        ? 'Loading...'
        : paginatedPokemon.results.map(pokemon => {
            return (
              <a
                key={pokemon.name}
                className="panel-block is-capitalized is-radiusless"
              >
                <span className="panel-icon">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>

                {pokemon.name}
              </a>
            );
          })}
    </>
  );
};

export default Content;
