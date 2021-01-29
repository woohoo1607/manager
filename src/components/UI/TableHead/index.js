import React from "react";

import "./styles.css";

const TableHead = ({ children, style = {} }) => (
  <thead className="table__head" style={style}>
    {children}
  </thead>
);

export default TableHead;
