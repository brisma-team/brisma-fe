import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowData: {
    ref_tim_audit_pic: [],
    ref_tim_audit_approver: [],
    note: "",
  },
  workflowDefaultData: {
    ref_tim_audit_pic: [],
    ref_tim_audit_approver: [],
    note: "",
  },
  validationErrorsWorkflow: {},
};

export const notulenEntranceEWPSlice = createSlice({
  name: "notulenEntranceEWP",
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
} = notulenEntranceEWPSlice.actions;

export default notulenEntranceEWPSlice.reducer;
