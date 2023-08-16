import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemon from "../../hooks/usePokemon";

const PokemonList = () => {
  const { pokemonListStates, setPokemonListStates } = usePokemon();

  return (
    <div className="pokemon-list-wrapper">
      <div>
        <h4>Pokemon List</h4>
      </div>
      <div className="pokemon-wrapper">
        {pokemonListStates.isLoading
          ? "Loading..."
          : pokemonListStates.pokemonList.map((pokemon) => (
              <Pokemon
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                id={pokemon.id}
              />
            ))}
      </div>
      <div className="buttons">
        <button
          disabled={!pokemonListStates.prevurl}
          onClick={() =>
            setPokemonListStates({
              ...pokemonListStates,
              pokedexUrl: pokemonListStates.prevurl,
            })
          }
          className="controls-button"
        >
          Prev
        </button>
        <button
          disabled={!pokemonListStates.nexturl}
          onClick={() =>
            setPokemonListStates({
              ...pokemonListStates,
              pokedexUrl: pokemonListStates.nexturl,
            })
          }
          className="controls-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
