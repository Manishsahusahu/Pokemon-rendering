import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [PokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nexturl, setNexturl] = useState("");
  const [prevurl, setPrevurl] = useState("");

  async function downloadData() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl);

    setNexturl(response.data.next);
    setPrevurl(response.data.previous);

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
    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadData();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div>
        <h4>Pokemon List</h4>
      </div>
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : PokemonList.map((pokemon) => (
              <Pokemon
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
              />
            ))}
      </div>
      <div className="buttons">
        <button disabled={!prevurl} onClick={()=> setPokedexUrl(prevurl)} className="controls-button">Prev</button>
        <button disabled={!nexturl} onClick={()=> setPokedexUrl(nexturl)} className="controls-button">Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
