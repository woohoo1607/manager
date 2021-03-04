import React from "react";

import "./styles.css";

const Table = React.forwardRef(
  ({ children, minWidth = "0px", ...props }, ref) => (
    <table className="table" ref={ref} style={{ minWidth }} {...props}>
      {children}
    </table>
  )
);

export default Table;
