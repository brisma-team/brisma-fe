import Swal from "sweetalert2";

export default async function infoSwal(message) {
  return Swal.fire({
    title: "Perhatian!",
    text: message,
    icon: "info",
    showConfirmButton: false,
    timer: 1500,
  });
}
