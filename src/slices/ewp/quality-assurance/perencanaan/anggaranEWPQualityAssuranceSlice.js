import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
  resetObjPayload: {
    stc_mapa_tipe_anggaran_kode: "",
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
  validationErrors: {},
};

export const anggaranEWPQualityAssuranceSlice = createSlice({
  name: "anggaranEWPQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = { ...state.resetObjPayload };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} = anggaranEWPQualityAssuranceSlice.actions;

export default anggaranEWPQualityAssuranceSlice.reducer;
