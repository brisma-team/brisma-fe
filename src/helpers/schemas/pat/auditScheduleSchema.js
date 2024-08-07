import * as yup from "yup";

const activityInfoSchema = yup.object().shape({
  name_kegiatan_audit: yup.string().required("Wajib diisi"),
  ref_metode: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  ref_tipe: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  // ref_jenis: yup.object().shape({
  //   kode: yup.string().required("Wajib diisi"),
  // }),
  pelaksanaan_start: yup.string().required("Wajib diisi"),
  pelaksanaan_end: yup.string().required("Wajib diisi"),
  tim_audit_id: yup.string().required("Wajib diisi"),
});

const activityObjectSchema = yup.object().shape({
  uker: yup
    .array()
    .of(
      yup.object().shape({
        ref_auditee_orgeh_kode: yup.string().required("Wajib diisi"),
        ref_auditee_branch_kode: yup.number().required("Wajib diisi"),
        tipe_uker: yup.string().required("Wajib diisi"),
      })
    )
    .min(1, "Wajib diisi, minimal 1 data")
    .test("unique", "Tidak boleh ada uker yang sama", function (value) {
      if (!value) return true; // Skip if the value is empty or undefined

      const seen = new Set();
      const isDuplicate = value.some((item) => {
        const identifier = `${item.ref_auditee_orgeh_kode}-${item.ref_auditee_branch_kode}`;
        if (seen.has(identifier)) {
          return true;
        }
        seen.add(identifier);
        return false;
      });

      return !isDuplicate;
    }),
});

export { activityInfoSchema, activityObjectSchema };
