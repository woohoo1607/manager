import React from "react";

import "./styles.css";

const Table = React.forwardRef(({ children, ...props }, ref) => (
  <table className="table" ref={ref} {...props}>
    {children}
  </table>
));

export default Table;
