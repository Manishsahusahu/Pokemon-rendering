import React from "react";
import './Pokemon.css'

const Pokemon = ({ name, image }) => {
  return (
    <div className="pokemon">
      <div>{name}</div>
      <div>
        <img className="pokemon-image" src={image} alt="" />
      </div>
    </div>
  );
};

export default Pokemon;
