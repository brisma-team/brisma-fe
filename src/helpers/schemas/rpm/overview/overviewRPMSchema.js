import * as yup from "yup";

const overviewRPMSchema = yup.object().shape({
  pic_submitter: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
  pic_evaluator: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
  pic_negotiator: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
});

export default overviewRPMSchema;
