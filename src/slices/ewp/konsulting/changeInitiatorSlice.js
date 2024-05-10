import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    initiator_from: "",
    initiator_to: "",
    note: "",
  },
  workflowDefaultData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    initiator_from: "",
    initiator_to: "",
    note: "",
  },
  validationErrorsWorkflow: {},
};

export const changeInitiatorSlice = createSlice({
  name: "changeInitiator",
  initialState,
  reducers: {
    setWorkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setWorkflowData,
  setValidationErrorsWorkflow,
  resetWorkflowData,
  resetCommentData,
  resetValidationErrorsWorkflow,
} = changeInitiatorSlice.actions;

export default changeInitiatorSlice.reducer;
