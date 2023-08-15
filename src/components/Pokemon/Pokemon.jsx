import React from "react";
import "./Pokemon.css";
import { Link } from "react-router-dom";

const Pokemon = ({ name, image, id }) => {
  return (
    <div className="pokemon">
      <div>{name}</div>
      <Link to={`/pokemon/${id}`}>
        <div>
          <img className="pokemon-image" src={image} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;
