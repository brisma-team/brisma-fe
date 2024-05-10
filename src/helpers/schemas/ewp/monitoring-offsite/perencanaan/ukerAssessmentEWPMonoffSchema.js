import * as yup from "yup";

const ukerAssessmentEWPMonoffSchema = yup.object().shape({
  tipe_uker: yup.string().required("Wajib diisi"),
  ref_auditee_branch_name: yup.string().required("Wajib diisi"),
  ref_auditee_orgeh_name: yup.string().required("Wajib diisi"),
});

export default ukerAssessmentEWPMonoffSchema;
