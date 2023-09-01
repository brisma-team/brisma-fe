import * as yup from "yup";

const ukerAssessmentMapaEWPSchema = yup.array().of(
  yup.object().shape({
    ref_auditee_orgeh_kode: yup.string().required("Orgeh wajib diisi"),
    ref_auditee_branch_kode: yup.string().required("Branch wajib diisi"),
    tipe_uker: yup.string().required("Tipe UKER wajib diisi"),
    gross_profit: yup.string().required("Gross Profit wajib diisi"),
  })
);

export default ukerAssessmentMapaEWPSchema;
