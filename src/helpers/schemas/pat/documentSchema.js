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
    .min(1, "Wajib diisi, minimal 1 data"),
  ref_tim_audit_signer: yup
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
    .min(1, "Wajib diisi, minimal 1 data"),
});

export { workflowSchema };
