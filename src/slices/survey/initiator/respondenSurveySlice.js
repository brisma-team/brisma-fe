import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTables: {
    respondenPn: [],
    respondenUker: [],
    respondednUkerPn: [],
  },
  dataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  dataHistoryWorkflow: [],
  payloadNewResponden: {
    pn: "",
    name: "",
    keterangan: "",
  },
  payloadNewUker: {
    orgeh_kode: "",
    orgeh_name: "",
    keterangan: "",
  },
  payloadNewRespondenPnByUker: [],
  validationErrorsWorkflow: {},
  defaultDataTables: {
    respondenPn: [],
    respondenUker: [],
    respondednUkerPn: [],
  },
  defaultPayloadNewResponden: {
    pn: "",
    name: "",
    keterangan: "",
  },
  defaultPayloadNewUker: {
    orgeh_kode: "",
    orgeh_name: "",
    keterangan: "",
  },
  defaultDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
};

export const respondenSurveySlice = createSlice({
  name: "respondenSurvey",
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
    setPayloadNewResponden: (state, action) => {
      state.payloadNewResponden = action.payload;
    },
    setPayloadNewUker: (state, action) => {
      state.payloadNewUker = action.payload;
    },
    setPayloadNewRespondenPnByUker: (state, action) => {
      state.payloadNewRespondenPnByUker = action.payload;
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
    resetPayloadNewResponden: (state) => {
      state.payloadNewResponden = { ...state.defaultPayloadNewResponden };
    },
    resetPayloadNewUker: (state) => {
      state.payloadNewUker = { ...state.defaultPayloadNewUker };
    },
    resetPayloadNewRespondenPnByUker: (state) => {
      state.payloadNewRespondenPnByUker = [];
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
  setPayloadNewResponden,
  setPayloadNewUker,
  setPayloadNewRespondenPnByUker,
  setValidationErrorsWorkflow,
  resetDataTables,
  resetDataWorkflow,
  resetDataHistoryWorkflow,
  resetPayloadNewResponden,
  resetPayloadNewUker,
  resetPayloadNewRespondenPnByUker,
  resetValidationErrorsWorkflow,
} = respondenSurveySlice.actions;

export default respondenSurveySlice.reducer;
