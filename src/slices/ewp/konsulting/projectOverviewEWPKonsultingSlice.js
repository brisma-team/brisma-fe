import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectOverviewData: {
    project_name: "",
    info_periode_pelaksanaan_start: "",
    info_periode_pelaksanaan_end: "",
    pat_jadwal_kegiatan_id: "",
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
    audit_year: "",
    pn_approver: "",
    nama_approver: "",
    no_surat: "",
    perihal: "",
    tanggal_surat: "",
    is_pat: false,
    url_file_surat: "",
    nama_file_surat: "",
    audited: false,
    project_terkait: [],
  },
  objPayloadRelatedProject: {
    project_id: "",
    project_name: "",
    is_new: true,
  },
  defaultData: {
    project_name: "",
    info_periode_pelaksanaan_start: "",
    info_periode_pelaksanaan_end: "",
    pat_jadwal_kegiatan_id: "",
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
    audit_year: "",
    pn_approver: "",
    nama_approver: "",
    no_surat: "",
    perihal: "",
    tanggal_surat: "",
    is_pat: false,
    url_file_surat: "",
    nama_file_surat: "",
    audited: false,
    project_terkait: [],
  },
  resetObjPayloadRelatedProject: {
    project_id: "",
    project_name: "",
    is_new: true,
  },
  validationErrorsSchedulePAT: {},
  validationErrorsSummaryPAT: {},
  validationErrorsDocumentNonPAT: {},
  validationErrorsScheduleNonPAT: {},
  validationErrorsSummaryNonPAT: {},
  validationErrorsRelatedProjectNonPAT: {},
};

export const projectOverviewEWPKonsultingSlice = createSlice({
  name: "projectOverviewEWPKonsulting",
  initialState,
  reducers: {
    setProjectOverviewData: (state, action) => {
      state.projectOverviewData = action.payload;
    },
    setObjPayloadRelatedProject: (state, action) => {
      state.objPayloadRelatedProject = action.payload;
    },
    setValidationErrorsSchedulePAT: (state, action) => {
      state.validationErrorsSchedulePAT = action.payload;
    },
    setValidationErrorsSummaryPAT: (state, action) => {
      state.validationErrorsSummaryPAT = action.payload;
    },
    setValidationErrorsDocumentNonPAT: (state, action) => {
      state.validationErrorsDocumentNonPAT = action.payload;
    },
    setValidationErrorsScheduleNonPAT: (state, action) => {
      state.validationErrorsScheduleNonPAT = action.payload;
    },
    setValidationErrorsSummaryNonPAT: (state, action) => {
      state.validationErrorsSummaryNonPAT = action.payload;
    },
    setValidationErrorsRelatedProjectNonPAT: (state, action) => {
      state.validationErrorsRelatedProjectNonPAT = action.payload;
    },
    resetValidationErrorsSchedulePAT: (state) => {
      state.validationErrorsSchedulePAT = {};
    },
    resetValidationErrorsSummaryPAT: (state) => {
      state.validationErrorsSummaryPAT = {};
    },
    resetValidationErrorsDocumentNonPAT: (state) => {
      state.validationErrorsDocumentNonPAT = {};
    },
    resetValidationErrorsScheduleNonPAT: (state) => {
      state.validationErrorsScheduleNonPAT = {};
    },
    resetValidationErrorsSummaryNonPAT: (state) => {
      state.validationErrorsSummaryNonPAT = {};
    },
    resetValidationErrorsRelatedProjectNonPAT: (state) => {
      state.validationErrorsRelatedProjectNonPAT = {};
    },
    resetProjectOverviewData: (state) => {
      state.projectOverviewData = { ...state.defaultData };
    },
    resetObjPayloadRelatedProject: (state) => {
      state.objPayloadRelatedProject = {
        ...state.resetObjPayloadRelatedProject,
      };
    },
  },
});

export const {
  setProjectOverviewData,
  setObjPayloadRelatedProject,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsDocumentNonPAT,
  setValidationErrorsScheduleNonPAT,
  setValidationErrorsSummaryNonPAT,
  setValidationErrorsRelatedProjectNonPAT,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsDocumentNonPAT,
  resetValidationErrorsScheduleNonPAT,
  resetValidationErrorsSummaryNonPAT,
  resetValidationErrorsRelatedProjectNonPAT,
  resetProjectOverviewData,
  resetObjPayloadRelatedProject,
} = projectOverviewEWPKonsultingSlice.actions;

export default projectOverviewEWPKonsultingSlice.reducer;
