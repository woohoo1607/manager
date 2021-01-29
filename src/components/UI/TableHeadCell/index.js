import React from "react";

import "./styles.css";

const TableHeadCell = ({ children, style = {} }) => (
  <th className="table__head-cell" style={style}>
    {children}
  </th>
);

export default TableHeadCell;
