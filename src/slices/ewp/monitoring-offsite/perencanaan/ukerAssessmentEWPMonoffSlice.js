import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    ref_auditee_branch_kode: 0,
    ref_auditee_branch_name: "",
    ref_auditee_orgeh_kode: 0,
    ref_auditee_orgeh_name: "",
    tipe_uker: "",
    description: "",
    gross_profit: 0
  },
  defaultObjPayload: {
    ref_auditee_branch_kode: 0,
    ref_auditee_branch_name: "",
    ref_auditee_orgeh_kode: 0,
    ref_auditee_orgeh_name: "",
    tipe_uker: "",
    description: "",
    gross_profit: 0
  },
  validationErrors: {},
};

export const ukerAssessmentEWPMonoffSlice = createSlice({
  name: "ukerAssessmentEWPMonoff",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = { ...state.defaultObjPayload };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} = ukerAssessmentEWPMonoffSlice.actions;

export default ukerAssessmentEWPMonoffSlice.reducer;
