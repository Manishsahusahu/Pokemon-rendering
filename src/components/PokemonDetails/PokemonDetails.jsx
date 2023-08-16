import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = ({ pokemonName }) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadData() {
    try {
      let response;
      if (pokemonName)
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      else if (id)
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.hegiht,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <div className="pokemon-name">Name: {pokemon.name}</div>
      <div className="pokemon-image">
        <img src={pokemon.image} alt="" />
      </div>
      <div className="pokemon-height">Height: {pokemon.height}</div>
      <div className="pokemon-weight">Weight: {pokemon.weight}</div>
      <div className="pokemon-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
    </div>
  );
};

export default PokemonDetails;
