import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default async function errorSwalTimeout(message, redirectUrl) {
  const router = useRouter();

  await Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    showConfirmButton: false,
    timer: 2500,
  }).then(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
    return;
  });
}
