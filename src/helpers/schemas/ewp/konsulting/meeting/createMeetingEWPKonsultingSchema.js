import * as yup from "yup";

const createMeetingEWPKonsultingSchema = yup.object().shape({
  judul_meeting: yup.string().required("Field wajib diisi"),
  periode_start: yup.string().required("Field wajib diisi"),
  periode_end: yup.string().required("Field wajib diisi"),
  metode_meeting: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  pic_meeting: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data PIC wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInPIC = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInPIC.length === 0;
    }),
  pembicara_meeting: yup
    .array()
    .of(
      yup.object().shape({
        pn: yup.string().required("Field wajib diisi"),
      })
    )
    .min(1, "Minimal 1 data Pembicara wajib diisi")
    .test("uniquePn", "PN tidak boleh sama", function (value) {
      const dataPn = value.map((item) => item.pn);
      const duplicatePnInPembicara = dataPn.filter(
        (pn, index) => dataPn.indexOf(pn) !== index
      );
      return duplicatePnInPembicara.length === 0;
    }),
});

export default createMeetingEWPKonsultingSchema;
