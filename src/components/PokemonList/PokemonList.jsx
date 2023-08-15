import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [PokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadData() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
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
    console.log(res);
    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      <div>PokemonList</div>
      {isLoading ? "Is loading..." : PokemonList.map((pokemon) => <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} />)}
    </div>
  );
};

export default PokemonList;
