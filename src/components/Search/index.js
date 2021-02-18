import React, { useEffect, useState } from "react";

import Input from "../UI/Input";

import "./styles.css";

const Search = ({ handleClick = () => {}, querySearch = "" }) => {
  const [inputValue, setInputValue] = useState(querySearch);

  useEffect(() => {
    if (!querySearch && inputValue) {
      setInputValue("");
    } else if (querySearch && !inputValue) {
      setInputValue(querySearch);
    }
    // eslint-disable-next-line
  }, [querySearch]);

  let searchDelay;

  const onChange = ({ target: { value = "" } }) => {
    setInputValue(value);
    if (searchDelay) {
      clearTimeout(searchDelay);
    }
    searchDelay = setTimeout(() => handleClick(value), 600);
  };

  return (
    <div className="search">
      <Input onChange={onChange} placeholder="Search..." value={inputValue} />
    </div>
  );
};

export default Search;
