import * as yup from "yup";

const activityInfoSchema = yup.object().shape({
  name_kegiatan_audit: yup.string().required("Wajib diisi"),
  ref_metode: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  ref_tipe: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  ref_jenis: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
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
    .min(1, "Wajib diisi, minimal 1 data"),
});

export { activityInfoSchema, activityObjectSchema };
