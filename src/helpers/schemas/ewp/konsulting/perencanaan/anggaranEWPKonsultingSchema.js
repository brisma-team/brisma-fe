import * as yup from "yup";

const anggaranEWPKonsultingSchema = yup.object().shape({
  tipe_anggaran_name: yup.string().required("Wajib diisi"),
  amount: yup.string().required("Wajib diisi"),
  tanggal: yup.string().required("Wajib diisi"),
  tanggal_end: yup.string().required("Wajib diisi"),
});

export default anggaranEWPKonsultingSchema;
