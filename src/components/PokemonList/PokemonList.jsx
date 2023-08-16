import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {

  const [pokemonListStates, setPokemonListStates] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nexturl: "",
    prevurl: "",
  });

  async function downloadData() {
    setPokemonListStates((state) => ({
      ...pokemonListStates,
      isLoading: true,
    }));
    const response = await axios.get(pokemonListStates.pokedexUrl);

    setPokemonListStates((state) => ({
      ...pokemonListStates,
      nexturl: response.data.next,
      prevurl: response.data.previous,
    }));

    const pokemonResultsPromises = response.data.results.map((result) =>
      axios.get(result.url)
    );
    const pokemonsData = await axios.all(pokemonResultsPromises);

    const res = pokemonsData.map((pokedata) => {
      const pokemon = pokedata.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    setPokemonListStates((state) => ({
      ...state,
      pokemonList: res,
      isLoading: false,
    }));
}

  useEffect(() => {
    downloadData();
  }, [pokemonListStates.pokedexUrl]);

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
