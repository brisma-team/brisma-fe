import Swal from "sweetalert2";

export default async function errorSwalTimeout(message) {
  return Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    showConfirmButton: false,
    timer: 2500,
  });
}
