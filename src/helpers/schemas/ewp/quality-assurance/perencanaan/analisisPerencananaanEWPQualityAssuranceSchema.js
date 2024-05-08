import * as yup from "yup";

const addProjectEksternalSchema = yup.object().shape({
  project_id: yup.string().required("Wajib diisi"),
  project_name: yup.string().required("Wajib diisi"),
  mtd_tipe: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  mtd_jenis: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  tahun: yup.string().required("Wajib diisi"),
  pic: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
});

const addProjectInternalSchema = yup.object().shape({
  pic: yup.object().shape({
    pn: yup.string().required("Wajib diisi"),
  }),
});

export { addProjectEksternalSchema, addProjectInternalSchema };
