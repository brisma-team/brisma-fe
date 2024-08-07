import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  objDataComment: {},
  resetObjDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  validationErrorsWorkflow: {},
};

export const dokumenWorkingPaperExecutionEWPAgileSlice = createSlice({
  name: "dokumenWorkingPaperExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataWorkflow: (state, action) => {
      state.objDataWorkflow = action.payload;
    },
    setObjDataComment: (state, action) => {
      state.objDataComment = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetObjDataWorkflow: (state) => {
      state.objDataWorkflow = { ...state.resetObjDataWorkflow };
    },
    resetObjDataComment: (state) => {
      state.objDataComment = [];
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setObjDataWorkflow,
  setObjDataComment,
  setValidationErrorsWorkflow,
  resetObjDataWorkflow,
  resetObjDataComment,
  resetValidationErrorsWorkflow,
} = dokumenWorkingPaperExecutionEWPAgileSlice.actions;

export default dokumenWorkingPaperExecutionEWPAgileSlice.reducer;
