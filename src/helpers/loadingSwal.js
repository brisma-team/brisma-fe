import { Loader } from "@/components/atoms";

import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

export default function loadingSwal(action) {
  if (action === "close") {
    return ReactSwal.close();
  }

  return ReactSwal.fire({
    title: "Silakan tunggu ...",
    html: (
      <div className="flex justify-center">
        <Loader />
      </div>
    ),
    showConfirmButton: false,
  });
}
