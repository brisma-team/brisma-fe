import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  workflowDefaultData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
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

export const documentKkpaEWPKonsultingSlice = createSlice({
  name: "documentKkpaEWPKonsulting",
  initialState,
  reducers: {
    setWorkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    setCommentData: (state, action) => {
      state.commentData = action.payload;
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetValidationErrorsWorkflow: (state) => {
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
  setValidationErrorsWorkflow,
  resetWorkflowData,
  resetCommentData,
  resetValidationErrorsWorkflow,
} = documentKkpaEWPKonsultingSlice.actions;

export default documentKkpaEWPKonsultingSlice.reducer;
