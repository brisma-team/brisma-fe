import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activityScheduleOtherData: {
    pat_id: "",
    nama: "",
    ref_metode: {
      kode: "",
      nama: "",
    },
    ref_tipe: {
      kode: "",
      nama: "",
    },
    ref_jenis: {
      kode: "",
      nama: "",
    },
    ref_tema: {
      kode: "",
      nama: "",
    },
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    deskripsi: "",
    uker: [],
    penanggung_jawab: [],
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  defaultData: {
    pat_id: "",
    nama: "",
    ref_metode: {
      kode: "",
      nama: "",
    },
    ref_tipe: {
      kode: "",
      nama: "",
    },
    ref_jenis: {
      kode: "",
      nama: "",
    },
    ref_tema: {
      kode: "",
      nama: "",
    },
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    deskripsi: "",
    uker: [],
    penanggung_jawab: [],
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  validationErrorsAI: {},
  validationErrorsAO: {},
};

export const activityScheduleOtherSlice = createSlice({
  name: "activityScheduleOther",
  initialState,
  reducers: {
    setActivityScheduleOtherData: (state, action) => {
      state.activityScheduleOtherData = action.payload;
    },
    setvalidationErrorsAI: (state, action) => {
      state.validationErrorsAI = action.payload;
    },
    setvalidationErrorsAO: (state, action) => {
      state.validationErrorsAO = action.payload;
    },
    resetvalidationErrorsAI: (state) => {
      state.validationErrorsAI = {};
    },
    resetvalidationErrorsAO: (state) => {
      state.validationErrorsAO = {};
    },
    resetOtherScheduleData: (state) => {
      state.activityScheduleOtherData = { ...state.defaultData };
    },
  },
});

export const {
  setActivityScheduleOtherData,
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetOtherScheduleData,
} = activityScheduleOtherSlice.actions;

export default activityScheduleOtherSlice.reducer;
