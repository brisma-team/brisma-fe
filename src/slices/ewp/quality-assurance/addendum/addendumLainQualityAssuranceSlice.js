import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataContentLatarBelakang: "",
  objDataContentTujuan: "",
  objDataContentAnalisa: "",
  objDataContentAnggaran: [],
  objDataContentJadwal: [],
  objDataContentRingkasan: [],
  objDataContentDetailRingkasan: {},
  objPayloadAnggaran: {
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
  objPayloadJadwal: {},
  objPayloadRingkasan: {},
  resetObjPayloadAnggaran: {
    stc_mapa_tipe_anggaran_kode: "",
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
  validationErrorsAnggaran: {},
  validationErrorsRingkasan: {},
};

export const addendumLainQualityAssuranceSlice = createSlice({
  name: "addendumLainQualityAssurance",
  initialState,
  reducers: {
    setObjDataContentLatarBelakang: (state, action) => {
      state.objDataContentLatarBelakang = action.payload;
    },
    setObjDataContentTujuan: (state, action) => {
      state.objDataContentTujuan = action.payload;
    },
    setObjDataContentAnalisa: (state, action) => {
      state.objDataContentAnalisa = action.payload;
    },
    setObjDataContentAnggaran: (state, action) => {
      state.objDataContentAnggaran = action.payload;
    },
    setObjDataContentJadwal: (state, action) => {
      state.objDataContentJadwal = action.payload;
    },
    setObjDataContentRingkasan: (state, action) => {
      state.objDataContentRingkasan = action.payload;
    },
    setObjDataContentDetailRingkasan: (state, action) => {
      state.objDataContentDetailRingkasan = action.payload;
    },
    setObjPayloadAnggaran: (state, action) => {
      state.objPayloadAnggaran = action.payload;
    },
    setObjPayloadJadwal: (state, action) => {
      state.objPayloadJadwal = action.payload;
    },
    setObjPayloadRingkasan: (state, action) => {
      state.objPayloadRingkasan = action.payload;
    },
    setValidationErrorsAnggaran: (state, action) => {
      state.validationErrorsAnggaran = action.payload;
    },
    setValidationErrorsRingkasan: (state, action) => {
      state.validationErrorsRingkasan = action.payload;
    },
    resetObjDataContentLatarBelakang: (state) => {
      state.objDataContentLatarBelakang = "";
    },
    resetObjDataContentTujuan: (state) => {
      state.objDataContentTujuan = "";
    },
    resetObjDataContentAnalisa: (state) => {
      state.objDataContentAnalisa = "";
    },
    resetObjDataContentAnggaran: (state) => {
      state.objDataContentAnggaran = [];
    },
    resetObjDataContentJadwal: (state) => {
      state.objDataContentJadwal = [];
    },
    resetObjDataContentRingkasan: (state) => {
      state.objDataContentRingkasan = [];
    },
    resetObjDataContentDetailRingkasan: (state) => {
      state.objDataContentDeteailRingkasan = {};
    },
    resetObjPayloadAnggaran: (state) => {
      state.objPayloadAnggaran = { ...state.resetObjPayloadAnggaran };
    },
    resetObjPayloadJadwal: (state) => {
      state.objPayloadJadwal = {};
    },
    resetObjPayloadRingkasan: (state) => {
      state.objPayloadRingkasan = {};
    },
    resetValidationErrorsAnggaran: (state) => {
      state.validationErrorsAnggaran = {};
    },
    resetValidationErrorsRingkasan: (state) => {
      state.validationErrorsRingkasan = {};
    },
  },
});

export const {
  setObjDataContentLatarBelakang,
  setObjDataContentTujuan,
  setObjDataContentAnalisa,
  setObjDataContentAnggaran,
  setObjDataContentJadwal,
  setObjDataContentRingkasan,
  setObjDataContentDetailRingkasan,
  setObjPayloadAnggaran,
  setObjPayloadJadwal,
  setObjPayloadRingkasan,
  setValidationErrorsAnggaran,
  setValidationErrorsRingkasan,
  resetObjDataContentLatarBelakang,
  resetObjDataContentTujuan,
  resetObjDataContentAnalisa,
  resetObjDataContentAnggaran,
  resetObjDataContentJadwal,
  resetObjDataContentRingkasan,
  resetObjDataContentDetailRingkasan,
  resetObjPayloadAnggaran,
  resetObjPayloadJadwal,
  resetObjPayloadRingkasan,
  resetValidationErrorsAnggaran,
  resetValidationErrorsRingkasan,
} = addendumLainQualityAssuranceSlice.actions;

export default addendumLainQualityAssuranceSlice.reducer;
