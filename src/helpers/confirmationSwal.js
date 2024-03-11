import Swal from "sweetalert2";

export default async function confirmationSwal(message, title) {
  return await Swal.fire({
    title: title || "Perhatian!",
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  });
}
