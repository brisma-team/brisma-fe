import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowData: {
    ref_tim_audit_pic: [],
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  workflowDefaultData: {
    ref_tim_audit_pic: [],
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  validationErrorsWorkflow: {},
};

export const beritaAcaraEntranceEWPSlice = createSlice({
  name: "beritaAcaraEntranceEWP",
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
  resetValidationErrorsWorkflow,
} = beritaAcaraEntranceEWPSlice.actions;

export default beritaAcaraEntranceEWPSlice.reducer;
