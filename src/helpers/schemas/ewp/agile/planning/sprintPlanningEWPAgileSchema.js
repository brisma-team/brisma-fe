import * as yup from "yup";

const sprintSchema = yup.object().shape({
  sprint_name: yup.string().required("Wajib diisi"),
  start_date: yup.string().required("Wajib diisi"),
  end_date: yup.string().required("Wajib diisi"),
});

const taskSchema = yup.object().shape({
  description: yup.string().required("Wajib diisi"),
  task_type_kode: yup.string().required("Wajib diisi"),
});

export { sprintSchema, taskSchema };
