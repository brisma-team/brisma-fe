import Swal from "sweetalert2";

export default async function inputSwal() {
  return await Swal.fire({
    input: "textarea",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
}
