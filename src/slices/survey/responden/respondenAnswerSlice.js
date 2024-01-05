import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCategory: [],
  payloadKuesioner: [],
  payloadInformasi: {
    nama_survey: "",
    deskripsi: "",
    catatan: "",
    jenis_survey_kode: "",
    jenis_survey_name: "",
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    ref_template_id: "",
    ref_template_name: "",
    ref_template_desc: "",
  },
  workflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  historyWorkflow: [],
  defaultWorkflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  validationErrorsWorkflow: {},
};

export const respondenAnswerSlice = createSlice({
  name: "respondenAnswer",
  initialState,
  reducers: {
    setDataCategory: (state, action) => {
      state.dataCategory = action.payload;
    },
    setWorkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setHistoryWorkflow: (state, action) => {
      state.historyWorkflow = action.payload;
    },
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    setPayloadInformasi: (state, action) => {
      state.payloadInformasi = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetDataCategory: (state) => {
      state.dataCategory = [];
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.defaultWorkflowData };
    },
    resetHistoryWorkflow: (state) => {
      state.historyWorkflow = [];
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setDataCategory,
  setWorkflowData,
  setPayloadKuesioner,
  setPayloadInformasi,
  setHistoryWorkflow,
  setValidationErrorsWorkflow,
  resetDataCategory,
  resetWorkflowData,
  resetPayloadKuesioner,
  resetHistoryWorkflow,
  resetValidationErrorsWorkflow,
} = respondenAnswerSlice.actions;

export default respondenAnswerSlice.reducer;
