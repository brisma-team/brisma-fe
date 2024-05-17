import * as yup from "yup";

const addActionPlanSchema = yup.object().shape({
  desc: yup.string().required("Wajib diisi"),
  batas_waktu: yup.string().required("Wajib diisi"),
});

export { addActionPlanSchema };
