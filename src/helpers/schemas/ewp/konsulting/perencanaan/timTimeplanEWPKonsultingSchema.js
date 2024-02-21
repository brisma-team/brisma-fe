import * as yup from "yup";
const timTimeplanEWPKonsultingSchema = yup.object().shape({
  auditor: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data Auditor wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInAuditor = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInAuditor.length === 0;
    })
    .test("uniquePnInAuditor", "PN tidak boleh sama", function (value) {
      const pnsInAuditor = value.map((item) => item.pn);
      const pnsInAuditee = this.parent.auditee
        ? this.parent.auditee.map((item) => item.pn)
        : [];
      const pnsInATA = this.parent.ata
        ? this.parent.ata.map((item) => item.pn)
        : [];

      const duplicates = pnsInAuditor.filter(
        (pn) => pnsInAuditee.includes(pn) || pnsInATA.includes(pn)
      );

      return duplicates.length === 0;
    }),
  auditee: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data Auditee wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInAuditor = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInAuditor.length === 0;
    })
    .test("uniquePnInAuditee", "PN tidak boleh sama", function (value) {
      const pnsInAuditee = value.map((item) => item.pn);
      const pnsInAuditor = this.parent.auditor
        ? this.parent.auditor.map((item) => item.pn)
        : [];
      const pnsInATA = this.parent.ata
        ? this.parent.ata.map((item) => item.pn)
        : [];

      const duplicates = pnsInAuditee.filter(
        (pn) => pnsInAuditor.includes(pn) || pnsInATA.includes(pn)
      );

      return duplicates.length === 0;
    }),
  ata: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data ATA wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInAuditor = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInAuditor.length === 0;
    })
    .test("uniquePnInATA", "PN tidak boleh sama", function (value) {
      const pnsInATA = value.map((item) => item.pn);
      const pnsInAuditor = this.parent.auditor
        ? this.parent.auditor.map((item) => item.pn)
        : [];
      const pnsInAuditee = this.parent.auditee
        ? this.parent.auditee.map((item) => item.pn)
        : [];

      const duplicates = pnsInATA.filter(
        (pn) => pnsInAuditor.includes(pn) || pnsInAuditee.includes(pn)
      );

      return duplicates.length === 0;
    }),
});

export default timTimeplanEWPKonsultingSchema;
