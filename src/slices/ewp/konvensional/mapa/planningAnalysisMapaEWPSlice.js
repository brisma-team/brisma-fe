import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // data
  planningAnalysisData: {},
  riskIssueData: [],
  riskIssueInfo: {},
  dataTables: {
    fileName: "",
    tableRows: [],
    tableValues: [],
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
  payloadSample: {
    url: "",
    filename: "",
    values: [],
    jumlah_baris: "",
    uniq_column: "",
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
  defaultPayloadSample: {
    url: "",
    filename: "",
    values: [],
    jumlah_baris: "",
    uniq_column: "",
  },
  defaultDataTables: {
    fileName: "",
    tableRows: [],
    tableValues: [],
  },

  //validation
  validationErrorsPayloadRiskIssue: {},
  validationErrorsPayloadSample: {},
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
    setPayloadSample: (state, action) => {
      state.payloadSample = action.payload;
    },

    // validation
    setValidationErrorsRiskIssue: (state, action) => {
      state.validationErrorsPayloadRiskIssue = action.payload;
    },

    // reset
    resetPayloadRiskIssue: (state) => {
      state.payloadRiskIssue = { ...state.defaultPayloadRiskIssue };
    },
    resetPayloadSample: (state) => {
      state.payloadSample = { ...state.defaultPayloadSample };
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
  setPayloadSample,
  setValidationErrorsRiskIssue,
  resetPayloadRiskIssue,
  resetPayloadSample,
  resetValidationErrorsPayloadRiskIssue,
  resetDataTables,
} = planningAnalysisMapaEWPSlice.actions;

export default planningAnalysisMapaEWPSlice.reducer;
