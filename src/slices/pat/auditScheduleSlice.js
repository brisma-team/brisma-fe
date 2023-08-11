import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auditScheduleData: {
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
    echannel: [],
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
    echannel: [],
    tim_audit_id: "",
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  validationErrorsAI: {},
  validationErrorsAO: {},
  auditTeamData: [],
};

export const auditScheduleSlice = createSlice({
  name: "auditSchedule",
  initialState,
  reducers: {
    setAuditScheduleData: (state, action) => {
      state.auditScheduleData = action.payload;
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
    resetAuditScheduleData: (state) => {
      state.auditScheduleData = { ...state.defaultData };
    },
  },
});

export const {
  setAuditScheduleData,
  setvalidationErrorsAI,
  setvalidationErrorsAO,
  setAuditTeamData,
  resetvalidationErrorsAI,
  resetvalidationErrorsAO,
  resetAuditScheduleData,
} = auditScheduleSlice.actions;

export default auditScheduleSlice.reducer;
