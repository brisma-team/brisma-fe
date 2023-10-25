import * as yup from "yup";

const auditTeamSchema = yup.object().shape({
  pat_id: yup.string().required("Field wajib diisi"),
  name: yup.string().required("Field wajib diisi"),
  ref_tipe_tim: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  ref_tim_audit_ma: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInMA = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInMA.length === 0;
    })
    .test("uniquePnInMA", "PN tidak boleh sama", function (value) {
      const pnsInMA = value.map((item) => item.pn);
      const pnsInKTA = this.parent.ref_tim_audit_kta
        ? this.parent.ref_tim_audit_kta.map((item) => item.pn)
        : [];
      const pnsInATA = this.parent.ref_tim_audit_ata
        ? this.parent.ref_tim_audit_ata.map((item) => item.pn)
        : [];

      const duplicates = pnsInMA.filter(
        (pn) => pnsInKTA.includes(pn) || pnsInATA.includes(pn)
      );

      return duplicates.length === 0;
    }),
  ref_tim_audit_kta: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInMA = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInMA.length === 0;
    })
    .test("uniquePnInKTA", "PN tidak boleh sama", function (value) {
      const pnsInKTA = value.map((item) => item.pn);
      const pnsInMA = this.parent.ref_tim_audit_ma
        ? this.parent.ref_tim_audit_ma.map((item) => item.pn)
        : [];
      const pnsInATA = this.parent.ref_tim_audit_ata
        ? this.parent.ref_tim_audit_ata.map((item) => item.pn)
        : [];

      const duplicates = pnsInKTA.filter(
        (pn) => pnsInMA.includes(pn) || pnsInATA.includes(pn)
      );

      return duplicates.length === 0;
    }),
  ref_tim_audit_ata: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInMA = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInMA.length === 0;
    })
    .test("uniquePnInATA", "PN tidak boleh sama", function (value) {
      const pnsInATA = value.map((item) => item.pn);
      const pnsInMA = this.parent.ref_tim_audit_ma
        ? this.parent.ref_tim_audit_ma.map((item) => item.pn)
        : [];
      const pnsInKTA = this.parent.ref_tim_audit_kta
        ? this.parent.ref_tim_audit_kta.map((item) => item.pn)
        : [];

      const duplicates = pnsInATA.filter(
        (pn) => pnsInMA.includes(pn) || pnsInKTA.includes(pn)
      );

      return duplicates.length === 0;
    }),
});

export default auditTeamSchema;
