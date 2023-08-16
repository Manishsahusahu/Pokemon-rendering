import React from "react";
import "./Search.css";
import useDebounce from "../../hooks/useDebounce";

const Search = ({ updateSearchTerm }) => {
  const debouncedCallback = useDebounce((e) =>
    updateSearchTerm(e.target.value)
  );
  return (
    <div className="search-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="Pokemon name..."
        onChange={debouncedCallback}
      />
    </div>
  );
};

export default Search;
