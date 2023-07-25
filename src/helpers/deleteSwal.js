import Swal from "sweetalert2";
import useDeleteData from "./useDeleteData";

const deleteSwal = (title, text, url, isMutate) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Batal",
    confirmButtonText: "Ya, hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      useDeleteData(url);
      isMutate;
    }
  });
};

export default deleteSwal;
