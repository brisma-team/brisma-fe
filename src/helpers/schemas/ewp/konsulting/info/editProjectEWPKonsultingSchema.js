import * as yup from "yup";

const PATSchema = yup.object().shape({
  project_name: yup.string().required("Wajib diisi"),
  info_periode_pelaksanaan_start: yup.string().required("Wajib diisi"),
  info_periode_pelaksanaan_end: yup.string().required("Wajib diisi"),
});

const nonPATSchema = yup.object().shape({
  project_name: yup.string().required("Wajib diisi"),
  info_periode_pelaksanaan_start: yup.string().required("Wajib diisi"),
  info_periode_pelaksanaan_end: yup.string().required("Wajib diisi"),
  no_surat: yup.string().required("Wajib diisi"),
  tanggal_surat: yup.string().required("Wajib diisi"),
  url_file_surat: yup.string().required("Wajib diisi"),
});

export { PATSchema, nonPATSchema };
