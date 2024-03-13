import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objWorkflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  objHistoryWorkflowData: [],
  validationErrorsWorkflow: {},
};

export const notulenMeetingEWPKonsultingSlice = createSlice({
  name: "notulenMeetingEWPKonsulting",
  initialState,
  reducers: {
    setWorkflowData: (state, action) => {
      state.objWorkflowData = action.payload;
    },
    setHistoryWorkflowData: (state, action) => {
      state.objHistoryWorkflowData = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetWorkflowData: (state) => {
      state.objWorkflowData = {
        sub_modul: "",
        sub_modul_id: "",
        pic: "",
        ref_tim_audit_approver: [],
        ref_tim_audit_signer: [],
        note: "",
      };
    },
    resetHistoryWorkflowData: (state) => {
      state.objHistoryWorkflowData = [];
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setWorkflowData,
  setHistoryWorkflowData,
  setValidationErrorsWorkflow,
  resetWorkflowData,
  resetHistoryWorkflowData,
  resetValidationErrorsWorkflow,
} = notulenMeetingEWPKonsultingSlice.actions;

export default notulenMeetingEWPKonsultingSlice.reducer;
