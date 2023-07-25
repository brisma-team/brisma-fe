import Swal from "sweetalert2";

const successSwalTimeout = async (message) => {
  return Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default successSwalTimeout;
