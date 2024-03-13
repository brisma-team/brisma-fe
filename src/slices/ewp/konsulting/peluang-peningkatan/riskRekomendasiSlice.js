import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTables: {
    riskList: [],
    rekomendasiList: [],
  },
  dataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  dataHistoryWorkflow: [],
  payloadNewRisk: {
    risk_abbr: "",
    risk_kode: "",
    risk_name: "",
  },
  payloadNewLingkup: {
    lingkup_pemeriksaan_id: "",
    lingkup_pemeriksaan_name: "",
  },
  payloadNewRekomendasi: [],
  validationErrorsWorkflow: {},
  defaultDataTables: {
    riskList: [],
    rekomendasiList: [],
  },
  defaultPayloadNewRisk: {
    risk_abbr: "",
    risk_kode: "",
    risk_name: "",
  },
  defaultPayloadNewLingkup: {
    lingkup_pemeriksaan_id: "",
    lingkup_pemeriksaan_name: "",
  },
  defaultPayloadNewRekomendasi: [],
  defaultDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
};

export const riskRekomendasiSlice = createSlice({
  name: "riskRekomendasi",
  initialState,
  reducers: {
    setDataTables: (state, action) => {
      state.dataTables = action.payload;
    },
    setDataWorkflow: (state, action) => {
      state.dataWorkflow = action.payload;
    },
    setDataHistoryWorkflow: (state, action) => {
      state.dataHistoryWorkflow = action.payload;
    },
    setPayloadNewRisk: (state, action) => {
      state.payloadNewRisk = action.payload;
    },
    setPayloadNewLingkup: (state, action) => {
      state.payloadNewLingkup = action.payload;
    },
    setPayloadNewRekomendasi: (state, action) => {
      state.payloadNewRekomendasi = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetDataTables: (state) => {
      state.dataTables = { ...state.defaultDataTables };
    },
    resetDataWorkflow: (state) => {
      state.dataWorkflow = { ...state.defaultDataWorkflow };
    },
    resetDataHistoryWorkflow: (state) => {
      state.dataHistoryWorkflow = [];
    },
    resetPayloadNewRisk: (state) => {
      state.payloadNewRisk = { ...state.defaultPayloadNewRisk };
    },
    resetPayloadNewLingkup: (state) => {
      state.payloadNewLingkup = { ...state.defaultPayloadNewLingkup };
    },
    resetPayloadNewRekomendasi: (state) => {
      state.payloadNewRekomendasi = [];
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setDataTables,
  setDataWorkflow,
  setDataHistoryWorkflow,
  setPayloadNewRisk,
  setPayloadNewLingkup,
  setPayloadNewRekomendasi,
  setValidationErrorsWorkflow,
  resetDataTables,
  resetDataWorkflow,
  resetDataHistoryWorkflow,
  resetPayloadNewRisk,
  resetPayloadNewLingkup,
  resetPayloadNewRekomendasi,
  resetValidationErrorsWorkflow,
} = riskRekomendasiSlice.actions;

export default riskRekomendasiSlice.reducer;
