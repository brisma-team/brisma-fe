import * as yup from "yup";
const auditTeamSchema = yup.object({
  name: yup.string().required("Field wajib diisi"),
  ref_tim_audit_ma: yup.array().of(
    yup.object({
      pn: yup.string().required("Field wajib diisi"),
    })
  ),
  ref_tim_audit_kta: yup.array().of(
    yup.object({
      pn: yup.string().required("Field wajib diisi"),
    })
  ),
  ref_tim_audit_ata: yup.array().of(
    yup.object({
      pn: yup.string().required("Field wajib diisi"),
      uker_binaans: yup.array().of(
        yup.object({
          orgeh_kode: yup.string().required("Field wajib diisi"),
          branch_kode: yup.string().required("Field wajib diisi"),
        })
      ),
    })
  ),
});

export default auditTeamSchema;
