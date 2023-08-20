import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

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
  const upperCase= (name)=>{
    return name.charAt(0).toUpperCase()+name.slice(1)
  }

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="pokemon-details-wrapper mt-3">
      <div className="pokemon-image">
        <img className="" src={pokemon.image} alt="" />
      </div>
      <div className="pokemon-name mt-1">
        <span className="fw-bold">Name:</span> {pokemon.name && upperCase(pokemon.name)}
      </div>
      <div className="pokemon-height mt-1">
        <span className="fw-bold">Height:</span> {pokemon.height}
      </div>
      <div className="pokemon-weight mt-1">
        <span className="fw-bold">Weight: </span>
        {pokemon.weight}
      </div>
      <div className="mt-1 fw-bold">{pokemon.types && "Types:"}</div>
      <div className="pokemon-types mt-1">
        {pokemon.types &&
          pokemon.types.map((t) => (
            <div key={t}>{t.slice(0, 1).toUpperCase() + t.slice(1)}</div>
          ))}
      </div>
    </div>
  );
};

export default PokemonDetails;
