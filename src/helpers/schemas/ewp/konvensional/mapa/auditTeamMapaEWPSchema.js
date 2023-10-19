import * as yup from "yup";
const auditTeamMapaEWPSchema = yup.object().shape({
  ref_tipe_tim: yup.object().shape({
    kode: yup.string().required("Wajib diisi"),
  }),
  tim_audit: yup.object().shape({
    ma: yup
      .array()
      .of(
        yup.object().shape({
          pn: yup.string().required("Field wajib diisi"),
        })
      )
      .min(1, "Minimal 1 data MA wajib diisi")
      .test("uniquePn", "PN tidak boleh sama", function (value) {
        const dataPn = value.map((item) => item.pn);
        const duplicatePnInMA = dataPn.filter(
          (pn, index) => dataPn.indexOf(pn) !== index
        );
        return duplicatePnInMA.length === 0;
      })
      .test("uniquePnInMA", "PN tidak boleh sama", function (value) {
        const pnsInMA = value.map((item) => item.pn);
        const pnsInKTA = this.parent.kta
          ? this.parent.kta.map((item) => item.pn)
          : [];
        const pnsInATA = this.parent.ata
          ? this.parent.ata.map((item) => item.pn)
          : [];

        const duplicates = pnsInMA.filter(
          (pn) => pnsInKTA.includes(pn) || pnsInATA.includes(pn)
        );

        return duplicates.length === 0;
      }),
    kta: yup
      .array()
      .of(
        yup.object().shape({
          pn: yup.string().required("Field wajib diisi"),
        })
      )
      .min(1, "Minimal 1 data KTA wajib diisi")
      .test("uniquePn", "PN tidak boleh sama", function (value) {
        const dataPn = value.map((item) => item.pn);
        const duplicatePnInMA = dataPn.filter(
          (pn, index) => dataPn.indexOf(pn) !== index
        );
        return duplicatePnInMA.length === 0;
      })
      .test("uniquePnInKTA", "PN tidak boleh sama", function (value) {
        const pnsInKTA = value.map((item) => item.pn);
        const pnsInMA = this.parent.ma
          ? this.parent.ma.map((item) => item.pn)
          : [];
        const pnsInATA = this.parent.ata
          ? this.parent.ata.map((item) => item.pn)
          : [];

        const duplicates = pnsInKTA.filter(
          (pn) => pnsInMA.includes(pn) || pnsInATA.includes(pn)
        );

        return duplicates.length === 0;
      }),
    ata: yup
      .array()
      .of(
        yup.object().shape({
          pn: yup.string().required("Field wajib diisi"),
        })
      )
      .min(1, "Minimal 1 data ATA wajib diisi")
      .test("uniquePn", "PN tidak boleh sama", function (value) {
        const dataPn = value.map((item) => item.pn);
        const duplicatePnInMA = dataPn.filter(
          (pn, index) => dataPn.indexOf(pn) !== index
        );
        return duplicatePnInMA.length === 0;
      })
      .test("uniquePnInATA", "PN tidak boleh sama", function (value) {
        const pnsInATA = value.map((item) => item.pn);
        const pnsInMA = this.parent.ma
          ? this.parent.ma.map((item) => item.pn)
          : [];
        const pnsInKTA = this.parent.kta
          ? this.parent.kta.map((item) => item.pn)
          : [];

        const duplicates = pnsInATA.filter(
          (pn) => pnsInMA.includes(pn) || pnsInKTA.includes(pn)
        );

        return duplicates.length === 0;
      }),
  }),
});

export default auditTeamMapaEWPSchema;
