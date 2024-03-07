import * as yup from "yup";

const matrixEWPKonsultingSchema = yup.object().shape({
  judul: yup.string().required("Wajib diisi"),
  auditor: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
});

export default matrixEWPKonsultingSchema;
