import React from "react";

const Table = React.forwardRef(({ children, ...props }, ref) => (
  <table className="table" ref={ref} {...props}>
    {children}
  </table>
));

export default Table;
