import React from "react";

import "./styles.css";

const TableRow = ({ children, style = {} }) => (
  <tr className="table__row" style={style}>
    {children}
  </tr>
);

export default TableRow;
