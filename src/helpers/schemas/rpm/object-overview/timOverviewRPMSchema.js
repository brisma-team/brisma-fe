import * as yup from "yup";

const timOverviewRPMSchema = yup.object().shape({
  pic_submitter: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
  pic_evaluator: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
  pic_negotiator: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
  submitter: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data Submitter wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInSubmitter = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInSubmitter.length === 0;
    }),
  evaluator: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data Evaluator wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInEvaluator = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInEvaluator.length === 0;
    }),
});

export default timOverviewRPMSchema;
