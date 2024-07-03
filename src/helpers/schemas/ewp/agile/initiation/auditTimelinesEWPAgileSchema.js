import * as yup from "yup";

const auditTimelinesEWPSchema = yup.object().shape({
  title: yup.string().required("Wajib diisi"),
  start_date: yup.string().required("Wajib diisi"),
  end_date: yup.string().required("Wajib diisi"),
});

export default auditTimelinesEWPSchema;
