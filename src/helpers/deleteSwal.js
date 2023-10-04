import Swal from "sweetalert2";
import useDeleteData from "./useDeleteData";

const deleteSwal = async (title, text, url) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Batal",
    confirmButtonText: "Ya, hapus!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await useDeleteData(url);
    }
  });
};

export default deleteSwal;
