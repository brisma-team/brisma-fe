import * as yup from "yup";

const loginSchema = yup.object().shape({
  pn: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .required("Silakan isi nomor PN Anda."),
  password: yup.string().required("Silakan isi password Anda."),
});

export default loginSchema;
