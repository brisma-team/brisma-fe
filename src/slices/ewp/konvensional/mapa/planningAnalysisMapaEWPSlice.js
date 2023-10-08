import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // data
  planningAnalysisData: {},
  riskIssueData: [],
  riskIssueInfo: {},
  dataTables: {
    fileName: "",
    tableRows: [],
    tableColumns: {},
    tableSelectedRows: [],
  },

  // payload
  payloadActivity: {},
  payloadSubActivity: {
    aktivitas_id: "",
    sub_aktivitas: [],
  },
  payloadRiskIssue: {
    mapa_uker_id: "",
    ref_sub_aktivitas_kode: "",
    ref_sub_aktivitas_name: "",
    ref_risk_issue_kode: "",
    ref_risk_issue_name: "",
    ref_sub_major_kode: "",
    ref_sub_major_name: "",
    deskripsi: "",
    program_audit: "",
    kriteria: "",
  },
  payloadUploadSample: {
    url: "",
    filename: "",
    values: [],
    jumlah_baris: "",
    uniq_column: "",
  },
  payloadSample: {
    sample_sumber_info: "",
    sample_jumlah_populasi: "",
    sample_jumlah_sample: "",
    sample_periode_start: "",
    sample_periode_end: "",
    sample_uraian: "",
    sample_ref_teknik_sampling_kode: "",
    sample_ref_teknik_sampling_name: "",
  },
  payloadDescAnalysisSubActivity: {
    sub_aktivitas_id: "",
    deskripsi: "",
  },

  // default data
  defaultPayloadRiskIssue: {
    mapa_uker_id: "",
    ref_sub_aktivitas_kode: "",
    ref_sub_aktivitas_name: "",
    ref_risk_issue_kode: "",
    ref_risk_issue_name: "",
    ref_sub_major_kode: "",
    ref_sub_major_name: "",
    deskripsi: "",
    program_audit: "",
    kriteria: "",
  },
  defaultPayloadUploadSample: {
    url: "",
    filename: "",
    values: [],
    jumlah_baris: "",
    uniq_column: "",
  },
  defaultPayloadSample: {
    sample_sumber_info: "",
    sample_jumlah_populasi: "",
    sample_jumlah_sample: "",
    sample_periode_start: "",
    sample_periode_end: "",
    sample_uraian: "",
    sample_ref_teknik_sampling_kode: "",
    sample_ref_teknik_sampling_name: "",
  },
  defaultPayloadDescAnalysisSubActivity: {
    sub_aktivitas_id: "",
    deskripsi: "",
  },
  defaultDataTables: {
    fileName: "",
    tableRows: [],
    tableColumns: {},
    tableSelectedRows: [],
  },

  //validation
  validationErrorsPayloadRiskIssue: {},
  validationErrorsPayloadUploadSample: {},
};

export const planningAnalysisMapaEWPSlice = createSlice({
  name: "planningAnalysisMapaEWP",
  initialState,
  reducers: {
    // data
    setPlanningAnalysisData: (state, action) => {
      state.planningAnalysisData = action.payload;
    },
    setRiskIssueData: (state, action) => {
      state.riskIssueData = action.payload;
    },
    setRiskIssueInfo: (state, action) => {
      state.riskIssueInfo = action.payload;
    },
    setDataTables: (state, action) => {
      state.dataTables = action.payload;
    },

    // payload
    setPayloadActivity: (state, action) => {
      state.payloadActivity = action.payload;
    },
    setPayloadSubActivity: (state, action) => {
      state.payloadSubActivity = action.payload;
    },
    setPayloadRiskIssue: (state, action) => {
      state.payloadRiskIssue = action.payload;
    },
    setPayloadUploadSample: (state, action) => {
      state.payloadUploadSample = action.payload;
    },
    setPayloadSample: (state, action) => {
      state.payloadSample = action.payload;
    },
    setPayloadDescAnalysisSubActivity: (state, action) => {
      state.payloadDescAnalysisSubActivity = action.payload;
    },

    // validation
    setValidationErrorsRiskIssue: (state, action) => {
      state.validationErrorsPayloadRiskIssue = action.payload;
    },

    // reset
    resetPayloadRiskIssue: (state) => {
      state.payloadRiskIssue = { ...state.defaultPayloadRiskIssue };
    },
    resetPayloadUploadSample: (state) => {
      state.payloadUploadSample = { ...state.defaultPayloadUploadSample };
    },
    resetPayloadSample: (state) => {
      state.payloadSample = { ...state.defaultPayloadSample };
    },
    resetPayloadDescAnalysisSubActivity: (state) => {
      state.payloadDescAnalysisSubActivity = {
        ...state.defaultPayloadDescAnalysisSubActivity,
      };
    },
    resetValidationErrorsPayloadRiskIssue: (state) => {
      state.validationErrorsPayloadRiskIssue = {};
    },
    resetDataTables: (state) => {
      state.dataTables = { ...state.defaultDataTables };
    },
  },
});

export const {
  setPlanningAnalysisData,
  setRiskIssueData,
  setRiskIssueInfo,
  setDataTables,
  setPayloadActivity,
  setPayloadSubActivity,
  setPayloadRiskIssue,
  setPayloadUploadSample,
  setPayloadSample,
  setPayloadDescAnalysisSubActivity,
  setValidationErrorsRiskIssue,
  resetPayloadRiskIssue,
  resetPayloadUploadSample,
  resetPayloadSample,
  resetPayloadDescAnalysisSubActivity,
  resetValidationErrorsPayloadRiskIssue,
  resetDataTables,
} = planningAnalysisMapaEWPSlice.actions;

export default planningAnalysisMapaEWPSlice.reducer;
