import * as yup from "yup";

const addRiskIssueMapaEWPSchema = yup.object().shape({
  ref_sub_major_kode: yup.string().required("Sub Major wajib diisi"),
  ref_risk_issue_kode: yup.string().required("Risk Issue wajib diisi"),
  deskripsi: yup.string().required("Deskripsi wajib diisi"),
});

const subActivityMapaEWPSchema = yup.object().shape({
  aktivitas_id: yup.number().required(),
  sub_aktivitas: yup
    .array()
    .of(
      yup.object().shape({
        mtd_sub_aktivitas_kode: yup
          .string()
          .required("Sub Aktivitas wajib diisi"),
      })
    )
    .test("unique", "Sub Aktivitas tidak boleh sama", function (value) {
      const subActivityCodes = value.map((item) => item.mtd_sub_aktivitas_kode);
      const duplicateSubActivityCodes = subActivityCodes.filter(
        (code, index) => subActivityCodes.indexOf(code) !== index
      );
      return duplicateSubActivityCodes.length === 0;
    }),
});

const riskIssueSampleMapaEWPSchema = yup.object().shape({
  sample_sumber_info: yup.string().required("Sumber Informasi wajib diisi"),
  sample_jumlah_populasi: yup.string().required("Jumlah Populasi wajib diisi"),
  sample_periode_start: yup.string().required("Periode wajib diisi"),
  sample_periode_end: yup.string().required("Periode wajib diisi"),
  sample_uraian: yup.string().required("Uraian Sample wajib diisi"),
  sample_ref_teknik_sampling_kode: yup
    .string()
    .required("Tehnik Sampling wajib diisi"),
});

export {
  addRiskIssueMapaEWPSchema,
  subActivityMapaEWPSchema,
  riskIssueSampleMapaEWPSchema,
};
