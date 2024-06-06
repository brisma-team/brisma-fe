import * as yup from "yup";

const perpanjanganDeadlineSchema = yup.object().shape({
  deadline: yup.string().required("Wajib diisi"),
});

const penggantianActionPlanSchema = yup.object().shape({
  action_plan: yup.string().required("Wajib diisi"),
  deadline: yup.string().required("Wajib diisi"),
});

const penggantianRekomendasiSchema = yup.object().shape({
  action_plan: yup.string().required("Wajib diisi"),
  deadline: yup.string().required("Wajib diisi"),
  tipe_rekomendasi: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  deskripsi_rekomendasi: yup.string().required("Wajib diisi"),
});

export {
  perpanjanganDeadlineSchema,
  penggantianActionPlanSchema,
  penggantianRekomendasiSchema,
};
