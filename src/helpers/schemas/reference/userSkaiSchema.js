import * as yup from "yup";

const userSkaiSchema = yup.object().shape({
  pn: yup.string().required("Wajib diisi"),
  name: yup.string().required("Wajib diisi"),
  uka_kode: yup.string().required("Wajib diisi"),
  role_kode: yup
    .array()
    .of(yup.string().required("Wajib diisi"))
    .required("Wajib diisi"),
});

export default userSkaiSchema;
