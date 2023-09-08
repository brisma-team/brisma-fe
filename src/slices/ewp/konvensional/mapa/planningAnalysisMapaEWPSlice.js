import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  planningAnalysisData: {},
  riskIssueData: [],
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
  payloadSample: {},
  payloadControl: {},
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
};

export const planningAnalysisMapaEWPSlice = createSlice({
  name: "planningAnalysisMapaEWP",
  initialState,
  reducers: {
    setPlanningAnalysisData: (state, action) => {
      state.planningAnalysisData = action.payload;
    },
    setRiskIssueData: (state, action) => {
      state.riskIssueData = action.payload;
    },
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
    setPayloadControl: (state, action) => {
      state.payloadControl = action.payload;
    },
    resetPayloadRiskIssue: (state) => {
      state.payloadRiskIssue = { ...state.defaultPayloadRiskIssue };
    },
  },
});

export const {
  setPlanningAnalysisData,
  setPayloadActivity,
  setPayloadSubActivity,
  setRiskIssueData,
  setPayloadRiskIssue,
  setPayloadSample,
  setPayloadControl,
  resetPayloadRiskIssue,
} = planningAnalysisMapaEWPSlice.actions;

export default planningAnalysisMapaEWPSlice.reducer;
