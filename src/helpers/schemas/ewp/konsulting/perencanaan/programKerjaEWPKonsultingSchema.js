import * as yup from "yup";

const addLingkupPemeriksaanSchema = yup.object().shape({
  judul_lingkup_pemeriksaan: yup.string().required("Wajib diisi"),
});

const addRiskSchema = yup.object().shape({
  kode: yup.string().required("Wajib diisi"),
});

const addControlSchema = yup
  .array()
  .of(
    yup.object().shape({
      kode: yup.string().required("Wajib diisi"),
      pn_pic: yup.string().required("Wajib diisi"),
    })
  )
  .min(1, "Wajib diisi, minimal 1 data")
  .test("uniqueControl", "Control tidak boleh sama", function (value) {
    const dataKode = value
      .filter((item) => item.kode !== "") // Filter nilai kosong
      .map((item) => item.kode);

    const duplicateKodeInControl = dataKode.filter(
      (kode, index) => dataKode.indexOf(kode) !== index
    );

    if (duplicateKodeInControl.length > 0) {
      throw this.createError({
        path: "uniqueControl",
        message: "Control tidak boleh sama",
      });
    }

    return true;
  });

export { addLingkupPemeriksaanSchema, addRiskSchema, addControlSchema };
