import * as yup from "yup";

const ukaSchema = yup.object().shape({
  kode: yup.string().required("Wajib diisi"),
  name: yup.string().required("Wajib diisi"),
<<<<<<< HEAD
  orgeh: yup.string().required("Wajib diisi"),
  branch: yup.string().required("Wajib diisi")
=======
  branch: yup.string().required("Wajib diisi"),
  orgeh: yup.string().required("Wajib diisi"),
>>>>>>> aaf3fbc28c2c09cb85ed853d14ae8d1828647119
});

export default ukaSchema;
