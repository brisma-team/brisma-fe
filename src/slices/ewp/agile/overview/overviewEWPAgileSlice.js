import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    initiator_from: "",
    initiator_to: "",
    note: "",
  },
  objDataHistoryWorfklow: [],
  objPayload: {
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
  resetObjDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    initiator_from: "",
    initiator_to: "",
    note: "",
  },
  resetObjPayload: {
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
  validationErrorsWorkflow: {},
};

export const overviewEWPAgileSlice = createSlice({
  name: "overviewEWPAgile",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataWorkflow: (state, action) => {
      state.objDataWorkflow = action.payload;
    },
    setObjDataHistoryWorkflow: (state, action) => {
      state.objDataHistoryWorfklow = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
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
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjDataWorkflow: (state) => {
      state.objDataWorkflow = { ...state.resetObjDataWorkflow };
    },
    resetObjDataHistoryWorkflow: (state) => {
      state.objDataHistoryWorfklow = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = { ...state.resetObjPayload };
    },
    resetObjPayloadRelatedProject: (state) => {
      state.objPayloadRelatedProject = {
        ...state.resetObjPayloadRelatedProject,
      };
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
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setObjData,
  setObjDataWorkflow,
  setObjDataHistoryWorkflow,
  setObjPayload,
  setObjPayloadRelatedProject,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsScheduleNonPAT,
  setValidationErrorsDocumentNonPAT,
  setValidationErrorsSummaryNonPAT,
  setValidationErrorsRelatedProjectNonPAT,
  setValidationErrorsWorkflow,
  resetObjData,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetObjPayload,
  resetObjPayloadRelatedProject,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsDocumentNonPAT,
  resetValidationErrorsScheduleNonPAT,
  resetValidationErrorsSummaryNonPAT,
  resetValidationErrorsRelatedProjectNonPAT,
  resetValidationErrorsWorkflow,
} = overviewEWPAgileSlice.actions;

export default overviewEWPAgileSlice.reducer;
