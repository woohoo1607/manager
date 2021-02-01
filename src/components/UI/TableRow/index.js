import React from "react";

import "./styles.css";

const TableRow = ({ children, style = {}, className, ref }) => (
  <tr
    className={`table__row ${className ? className : ""}`}
    style={style}
    ref={ref}
  >
    {children}
  </tr>
);

export default TableRow;
