import PaginationDefault from "@atlaskit/pagination";
import { useState, useEffect } from "react";

const CustomPagination = ({
  defaultCurrentPage,
  perPage,
  totalData,
  handleSetPagination,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage || 1);

  const totalPage = Math.ceil(totalData / perPage);

  const arrPages = [];
  for (let i = 1; i <= totalPage; i++) {
    arrPages.push(i);
  }

  useEffect(() => {
    const newStartIndex = (currentPage - 1) * perPage;
    const newEndIndex = newStartIndex + perPage;

    handleSetPagination(newStartIndex, newEndIndex);
  }, [currentPage, perPage]);

  const handleChange = (e) => {
    if (e?.target?.offsetParent?.ariaLabel === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (e?.target?.offsetParent?.ariaLabel === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (!isNaN(parseInt(e.target.textContent))) {
      setCurrentPage(parseInt(e.target.textContent));
    }
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <PaginationDefault
        pages={arrPages}
        nextLabel="next"
        previousLabel="prev"
        onChange={(e) => handleChange(e)}
        selectedIndex={currentPage - 1}
      />
    </div>
  );
};

export default CustomPagination;
