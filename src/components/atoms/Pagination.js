import PaginationDefault from "@atlaskit/pagination";
import { loadingSwal } from "@/helpers";

const Pagination = ({ pages, setCurrentPage, withLoading = false }) => {
  const handleChangePage = (value) => {
    if (withLoading) {
      loadingSwal();
    }
    setCurrentPage(value);
  };

  const arrPages = [];
  for (let i = 1; i <= pages; i++) {
    arrPages.push(i);
  }

  return (
    <div className="w-full flex justify-center mt-6">
      <PaginationDefault
        pages={arrPages}
        onChange={(e) => handleChangePage(parseInt(e.target.textContent))}
      />
    </div>
  );
};

export default Pagination;
