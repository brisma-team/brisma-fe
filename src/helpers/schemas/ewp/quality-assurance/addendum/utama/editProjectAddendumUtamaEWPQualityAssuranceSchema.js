import * as yup from "yup";

const editProjectAddendumUtamaEWPQualityAssuranceSchema = yup.object().shape({
  pic: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
  petugas: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Wajib diisi, minimal 1 data")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const pns = value.map((item) => item.pn);
      const isDuplicate = pns.some((pn, index) => pns.indexOf(pn) !== index);
      return !isDuplicate;
    }),
});

export default editProjectAddendumUtamaEWPQualityAssuranceSchema;
