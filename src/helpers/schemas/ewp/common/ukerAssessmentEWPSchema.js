import * as yup from "yup";

const ukerAssessmentEWPSchema = yup.object().shape({
  ref_auditee_orgeh_kode: yup.string().required("Orgeh wajib diisi"),
  ref_auditee_branch_kode: yup.string().required("Branch wajib diisi"),
  tipe_uker: yup.string().required("Tipe UKER wajib diisi"),
});

export default ukerAssessmentEWPSchema;
