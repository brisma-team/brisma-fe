import * as yup from "yup";

const assignmentMapaEWPSchema = yup.object().shape({
  pn: yup.string().required("Auditor wajib diisi"),
  mandays: yup.string().required("Mandays wajib diisi"),
});

export default assignmentMapaEWPSchema;
