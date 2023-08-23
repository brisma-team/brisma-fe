import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectOverviewData: {
    project_name: "",
    info_periode_pelaksanaan_start: "",
    info_periode_pelaksanaan_end: "",
    pat_jadwal_audit_id: "",
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
    audit_year: null,
    pn_approver: "",
    nama_approver: "",
    no_surat: "",
    perihal: "",
    tanggal_surat: "",
    is_pat: false,
  },
  defaultData: {
    project_name: "",
    info_periode_pelaksanaan_start: "",
    info_periode_pelaksanaan_end: "",
    pat_jadwal_audit_id: "",
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
    audit_year: null,
    pn_approver: "",
    nama_approver: "",
    no_surat: "",
    perihal: "",
    tanggal_surat: "",
    is_pat: false,
  },
  validationErrorsSchedule: {},
  validationErrorsSummary: {},
};

export const projectOverviewEWPSlice = createSlice({
  name: "projectOverviewEWP",
  initialState,
  reducers: {
    setProjectOverviewData: (state, action) => {
      state.projectOverviewData = action.payload;
    },
    setValidationErrorsSchedule: (state, action) => {
      state.validationErrorsSchedule = action.payload;
    },
    setValidationErrorsSummary: (state, action) => {
      state.validationErrorsSummary = action.payload;
    },
    resetValidationErrorsSchedule: (state) => {
      state.validationErrorsSchedule = {};
    },
    resetValidationErrorsSummary: (state) => {
      state.validationErrorsSummary = {};
    },
    resetProjectOverviewData: (state) => {
      state.projectOverviewData = { ...state.defaultData };
    },
  },
});

export const {
  setProjectOverviewData,
  setValidationErrorsSchedule,
  setValidationErrorsSummary,
  resetValidationErrorsSchedule,
  resetValidationErrorsSummary,
  resetProjectOverviewData,
} = projectOverviewEWPSlice.actions;

export default projectOverviewEWPSlice.reducer;
