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
  activityScheduleOtherDefaultData: {
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
};

export const activityScheduleOtherSlice = createSlice({
  name: "activityScheduleOther",
  initialState,
  reducers: {
    setActivityScheduleOtherData: (state, action) => {
      state.activityScheduleOtherData = action.payload;
    },
    setActivityScheduleOtherDefaultData: (state, action) => {
      state.activityScheduleOtherDefaultData = action.payload;
    },
  },
});

export const {
  setActivityScheduleOtherData,
  setActivityScheduleOtherDefaultData,
} = activityScheduleOtherSlice.actions;

export default activityScheduleOtherSlice.reducer;
