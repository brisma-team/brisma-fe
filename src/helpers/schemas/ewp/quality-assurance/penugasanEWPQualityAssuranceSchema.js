import * as yup from "yup";

const penugasanEWPQualityAssuranceSchema = yup.object().shape({
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

export default penugasanEWPQualityAssuranceSchema;
