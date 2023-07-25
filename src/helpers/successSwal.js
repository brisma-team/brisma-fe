import Swal from "sweetalert2";

export default async function successSwal(message) {
  return Swal.fire({
    title: "Sukses!",
    text: message,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
