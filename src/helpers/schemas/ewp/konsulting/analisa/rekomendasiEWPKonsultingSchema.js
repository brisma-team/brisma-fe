import * as yup from "yup";

const rekomendasiEWPKonsultingSchema = yup.object().shape({
  deadline: yup.string().required("Wajib diisi"),
  desc: yup.string().required("Wajib diisi"),
});

export default rekomendasiEWPKonsultingSchema;
