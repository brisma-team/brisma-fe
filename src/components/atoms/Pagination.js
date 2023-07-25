import React from "react";
import PaginationDefault from "@atlaskit/pagination";

const Pagination = ({ pages }) => {
  return (
    <PaginationDefault
      nextLabel="Next"
      label="Page"
      pageLabel="Page"
      pages={pages}
      previousLabel="Previous"
    />
  );
};

export default Pagination;
