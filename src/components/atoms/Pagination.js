import PaginationDefault from "@atlaskit/pagination";

const Pagination = ({ pages, setCurrentPage }) => {
  const handleChangePage = (value) => {
    setCurrentPage(value);
  };

  const arrPages = [];
  for (let i = 1; i <= pages; i++) {
    arrPages.push(i);
  }

  return (
    <div className="w-full flex justify-center mt-6">
      <PaginationDefault
        nextLabel="Next"
        label="Page"
        pageLabel="Page"
        pages={arrPages}
        previousLabel="Previous"
        onChange={(e) => handleChangePage(parseInt(e.target.textContent))}
      />
    </div>
  );
};

export default Pagination;
