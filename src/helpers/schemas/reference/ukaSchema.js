import * as yup from "yup";

const ukaSchema = yup.object().shape({
  kode: yup.string().required("Wajib diisi"),
  name: yup.string().required("Wajib diisi"),
  branch: yup.string().required("Wajib diisi"),
  orgeh: yup.string().required("Wajib diisi"),
});

export default ukaSchema;

