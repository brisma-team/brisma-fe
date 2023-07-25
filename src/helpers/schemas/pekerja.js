import * as yup from "yup";

const pekerjaSchema = yup.object().shape({
  pn: yup
    .object()
    .transform((value) => (value === "" ? undefined : value))
    .required("Silakan isi nomor PN user."),
});

export default pekerjaSchema;
