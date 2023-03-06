import Swal from "sweetalert2";

export default function errorSwal(error) {
	let message;

	if (error.response.data.message) {
		message = error.response.data.message;
	} else if (error.message) {
		message = error.message;
	}

	return Swal.fire({
		title: "Error!",
		text: message,
		icon: "error",
		confirmButtonColor: "rgb(30,66,159)",
	});
}
