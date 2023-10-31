import Swal from "sweetalert2";

export default async function inputSwal(message, confirmButtonText) {
  return await Swal.fire({
    input: "textarea",
    title: "Perhatian!",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
  });
}
