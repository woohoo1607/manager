import React, { useEffect, useState } from "react";
import Input from "../UI/Input";

import "./styles.css";

const Search = ({ handleClick = () => {}, querySearch = "" }) => {
  const [inputValue, setInputValue] = useState(querySearch);

  useEffect(() => {
    if (!querySearch && inputValue) {
      setInputValue("");
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
      <Input
        onChange={onChange}
        placeholder="Search..."
        // defaultValue={defaultValue}
        value={inputValue}
      />
    </div>
  );
};

export default Search;
