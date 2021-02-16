import React from "react";
import Input from "../UI/Input";

import "./styles.css";

const Search = ({ handleClick = () => {} }) => {
  let searchDelay;
  const onChange = ({ target: { value = "" } }) => {
    if (searchDelay) {
      clearTimeout(searchDelay);
    }
    searchDelay = setTimeout(() => handleClick(value), 600);
  };

  return (
    <div className="search">
      <Input onChange={onChange} placeholder="Search..." />
    </div>
  );
};

export default Search;
