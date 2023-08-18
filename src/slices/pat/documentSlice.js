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
  commentData: {
    ref_bab_pat_kode: "",
    deskripsi: "",
    parent_comment_id: "",
  },
  commentDefaultData: {
    ref_bab_pat_kode: "",
    deskripsi: "",
    parent_comment_id: "",
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
    setCommentData: (state, action) => {
      state.commentData = action.payload;
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetvalidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
    resetCommentData: (state) => {
      state.commentData = { ...state.commentDefaultData };
    },
  },
});

export const {
  setWorkflowData,
  setCommentData,
  setvalidationErrorsWorkflow,
  resetWorkflowData,
  resetCommentData,
  resetvalidationErrorsWorkflow,
} = documentSlice.actions;

export default documentSlice.reducer;
