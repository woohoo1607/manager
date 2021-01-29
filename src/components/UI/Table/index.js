import React from "react";

import "./styles.css";

const Table = ({ children, style = {} }) => (
  <table className="table" style={style}>
    {children}
  </table>
);

export default Table;
