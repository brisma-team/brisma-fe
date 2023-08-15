import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowData: {
    ref_tim_audit_maker: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  workflowDefaultData: {
    ref_tim_audit_maker: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  validationErrorsWorkflow: {},
};

export const documentSlice = createSlice({
  name: "documentPAT",
  initialState,
  reducers: {
    setWorkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setvalidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetvalidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setWorkflowData,
  setvalidationErrorsWorkflow,
  resetWorkflowData,
  resetvalidationErrorsWorkflow,
} = documentSlice.actions;

export default documentSlice.reducer;
