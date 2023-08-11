import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activityScheduleData: {
    pat_id: "",
    name_kegiatan_audit: "",
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
    tim_audit_id: "",
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  defaultData: {
    pat_id: "",
    name_kegiatan_audit: "",
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
    tim_audit_id: "",
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  validationErrorsAI: {},
  validationErrorsAO: {},
  auditTeamData: [],
};

export const activityScheduleSlice = createSlice({
  name: "activitySchedule",
  initialState,
  reducers: {
    setActivityScheduleData: (state, action) => {
      state.activityScheduleData = action.payload;
    },
    setAuditTeamData: (state, action) => {
      state.auditTeamData = action.payload;
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
    resetActivityScheduleData: (state) => {
      state.activityScheduleData = { ...state.defaultData };
    },
  },
});

export const {
  setActivityScheduleData,
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  setAuditTeamData,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetActivityScheduleData,
} = activityScheduleSlice.actions;

export default activityScheduleSlice.reducer;
