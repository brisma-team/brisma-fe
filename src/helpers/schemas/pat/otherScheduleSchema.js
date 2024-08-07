import * as yup from "yup";

const activityInfoSchema = yup.object().shape({
  nama: yup.string().required("Wajib diisi"),
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
  penanggung_jawab: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Wajib diisi, minimal 1 data")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInMA = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInMA.length === 0;
    }),
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
    .test("unique", "Tidak boleh ada data yang sama", function (value) {
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
