import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataContent: {},
  objDataCatatanNegosiasi: [],
  objDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  objDataHistoryWorkflow: [],
  resetObjDataWorkflow: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  validationErrors: {},
};

export const negosiasiActionPlanRPMQualityAssuranceSlice = createSlice({
  name: "negosiasiActionPlanRPMQualityAssurance",
  initialState,
  reducers: {
    setObjDataContent: (state, action) => {
      state.objDataContent = action.payload;
    },
    setObjDataCatatanNegosiasi: (state, action) => {
      state.objDataCatatanNegosiasi = action.payload;
    },
    setObjDataWorkflow: (state, action) => {
      state.objDataWorkflow = action.payload;
    },
    setObjDataHistoryWorkflow: (state, action) => {
      state.objDataHistoryWorkflow = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjDataContent: (state) => {
      state.objDataContent = {};
    },
    resetObjDataCatatanNegosiasi: (state) => {
      state.objDataCatatanNegosiasi = [];
    },
    resetObjDataWorkflow: (state) => {
      state.objDataWorkflow = { ...state.resetObjDataWorkflow };
    },
    resetObjDataHistoryWorkflow: (state) => {
      state.objDataHistoryWorkflow = [];
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjDataContent,
  setObjDataCatatanNegosiasi,
  setObjDataWorkflow,
  setObjDataHistoryWorkflow,
  setValidationErrors,
  resetObjDataContent,
  resetObjDataCatatanNegosiasi,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetValidationErrors,
} = negosiasiActionPlanRPMQualityAssuranceSlice.actions;

export default negosiasiActionPlanRPMQualityAssuranceSlice.reducer;
