import * as yup from "yup";

const workflowSchema = yup.object().shape({
  ref_tim_audit_approver: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .test("unique-pn", "Nomor PN tidak boleh sama", function (value) {
      const pnSet = {};
      for (const { pn } of value) {
        if (pnSet[pn]) {
          return false;
        }
        pnSet[pn] = true;
      }
      return true;
    })
    .min(1, "Wajib diisi, minimal 1 data")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInSigner = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInSigner.length === 0;
    }),
});

export { workflowSchema };
