import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCategory: [],
  payloadKuesioner: [],
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
  setHistoryWorkflow,
  setValidationErrorsWorkflow,
  resetDataCategory,
  resetWorkflowData,
  resetPayloadKuesioner,
  resetHistoryWorkflow,
  resetValidationErrorsWorkflow,
} = respondenAnswerSlice.actions;

export default respondenAnswerSlice.reducer;
