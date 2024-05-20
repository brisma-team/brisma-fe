import * as yup from "yup";

const addRekomendasiSchema = yup.object().shape({
  desc: yup.string().required("Wajib diisi"),
  tipe_rekomendasi: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
});

export { addRekomendasiSchema };
