import * as yup from "yup";

const ukerAssessmentEWPSchema = yup.object().shape({
  ref_auditee_orgeh_kode: yup.string().required("Orgeh wajib diisi"),
  ref_auditee_branch_kode: yup.string().required("Branch wajib diisi"),
});

export default ukerAssessmentEWPSchema;
