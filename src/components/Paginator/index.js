import React from "react";
import ReactPaginate from "react-paginate";

import "./styles.css";

const Paginator = ({ pages = 0, currentPage = 1, changePage = () => {} }) => (
  <ReactPaginate
    pageCount={pages}
    forcePage={currentPage - 1}
    containerClassName="pagination"
    previousLinkClassName="pagination__link"
    nextLinkClassName="pagination__link"
    disabledClassName="pagination__link-disabled"
    activeClassName="pagination__page-active"
    pageClassName="pagination__page"
    onPageChange={changePage}
  />
);

export default Paginator;
