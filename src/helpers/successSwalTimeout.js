import Swal from "sweetalert2";

export default async function successSwalTimeout(message) {
  return Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}
