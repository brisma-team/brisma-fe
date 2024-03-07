import * as yup from "yup";

const overviewDetailPeluangSchema = yup.object().shape({
  judul_kkpt: yup.string().required("Wajib diisi"),
});

export default overviewDetailPeluangSchema;
