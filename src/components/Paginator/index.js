import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

import "./styles.css";

const Paginator = ({
  countItems = 0,
  showCount = 1,
  offset = 0,
  changePage = () => {},
  queryPage = 1,
}) => {
  const pages = Math.round(countItems / showCount) || 1;

  useEffect(() => {
    if (Number.isInteger(+queryPage)) {
      if (queryPage <= 0 || queryPage > pages) {
        changePage({ selected: queryPage > pages ? pages - 1 : 0 });
      }
    } else {
      changePage({ selected: 0 });
    }
  }, [changePage, queryPage, pages]);
  return (
    <ReactPaginate
      pageCount={pages}
      forcePage={offset}
      containerClassName="pagination"
      previousLinkClassName="pagination__item pagination__item_link"
      nextLinkClassName="pagination__item pagination__item_link"
      disabledClassName="pagination__item pagination__item_link_disabled"
      activeClassName="pagination__item_active"
      pageClassName="pagination__item"
      onPageChange={changePage}
    />
  );
};

export default Paginator;
