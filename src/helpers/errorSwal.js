import Swal from "sweetalert2";

export default function errorSwal(error, html) {
  let message;

  if (error?.response?.data?.message) {
    message = error?.response?.data?.message;
  } else if (error?.message) {
    message = error?.message;
  } else {
    message = error;
  }

  return Swal.fire({
    title: message,
    icon: "error",
    html: html || null,
    confirmButtonColor: "rgb(30,66,159)",
  });
}
