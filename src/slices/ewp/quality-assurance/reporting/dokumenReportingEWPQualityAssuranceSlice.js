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

export const dokumenReportingEWPQualityAssuranceSlice = createSlice({
  name: "dokumenReportingEWPQualityAssurance",
  initialState,
  reducers: {
    setObjDataWorkflow: (state, action) => {
      state.objDataWorkflow = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    resetObjDataWorkflow: (state) => {
      state.objDataWorkflow = { ...state.resetObjDataWorkflow };
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
  },
});

export const {
  setObjDataWorkflow,
  setValidationErrorsWorkflow,
  resetObjDataWorkflow,
  resetValidationErrorsWorkflow,
} = dokumenReportingEWPQualityAssuranceSlice.actions;

export default dokumenReportingEWPQualityAssuranceSlice.reducer;
