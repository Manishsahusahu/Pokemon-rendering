import React, { useState } from "react";
import Search from "../Search/Search";
import "./Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

const Pokedex = () => {
  const [searchTerm, SetsearchTerm] = useState("");
  return (
    <div className="pokedex-wrapper">
      <h1 id="pokedex-heading">Pokedex</h1>
      <Search updateSearchTerm={SetsearchTerm} />
      {searchTerm.length === 0 ? <PokemonList /> : <PokemonDetails pokemonName={searchTerm} />}
    </div>
  );
};

export default Pokedex;
