import * as yup from "yup";

const addRiskIssueMapaEWPSchema = yup.object().shape({
  ref_sub_major_kode: yup.string().required("Sub Major wajib diisi"),
  ref_risk_issue_kode: yup.string().required("Risk Issue wajib diisi"),
  deskripsi: yup.string().required("Deskripsi wajib diisi"),
});

export { addRiskIssueMapaEWPSchema };
