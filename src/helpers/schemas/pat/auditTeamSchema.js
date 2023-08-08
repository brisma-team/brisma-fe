import * as yup from "yup";

const auditTeamSchema = yup.object().shape({
  pat_id: yup.string().required("Field wajib diisi"),
  name: yup.string().required("Field wajib diisi"),
  ref_tim_audit_ma: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const allPns = [
        ...value.map((item) => item.pn),
        ...(this.parent.ref_tim_audit_ata || []).map((item) => item.pn),
        ...(this.parent.ref_tim_audit_kta || []).map((item) => item.pn),
      ];
      return new Set(allPns).size === allPns.length;
    }),
  ref_tim_audit_kta: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const allPns = [
        ...(this.parent.ref_tim_audit_ma || []).map((item) => item.pn),
        ...(this.parent.ref_tim_audit_ata || []).map((item) => item.pn),
        ...value.map((item) => item.pn),
      ];
      return new Set(allPns).size === allPns.length;
    }),
  ref_tim_audit_ata: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
        uker_binaans: yup.array().of(
          yup.object().shape({
            orgeh_kode: yup.string().required("Field wajib diisi"),
            branch_kode: yup.string().required("Field wajib diisi"),
          })
        ),
      })
    )
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const allPns = [
        ...(this.parent.ref_tim_audit_ma || []).map((item) => item.pn),
        ...value.map((item) => item.pn),
        ...(this.parent.ref_tim_audit_kta || []).map((item) => item.pn),
      ];
      return new Set(allPns).size === allPns.length;
    }),
});

export default auditTeamSchema;
