import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataContent: {},
  objDataDokumenLampiran: [],
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
  objPayloadTanggapan: "",
  objPayloadHasilEvaluasi: {},
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

export const evaluasiActionPlanRPMQualityAssuranceSlice = createSlice({
  name: "evaluasiActionPlanRPMQualityAssurance",
  initialState,
  reducers: {
    setObjDataContent: (state, action) => {
      state.objDataContent = action.payload;
    },
    setObjDataDokumenLampiran: (state, action) => {
      state.objDataDokumenLampiran = action.payload;
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
    setObjPayloadTanggapan: (state, action) => {
      state.objPayloadTanggapan = action.payload;
    },
    setObjPayloadHasilEvaluasi: (state, action) => {
      state.objPayloadHasilEvaluasi = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjDataContent: (state) => {
      state.objDataContent = {};
    },
    resetObjDataDokumenLampiran: (state) => {
      state.objDataDokumenLampiran = [];
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
    resetObjPayloadTanggapan: (state) => {
      state.objPayloadTanggapan = "";
    },
    resetObjPayloadHasilEvaluasi: (state) => {
      state.objPayloadHasilEvaluasi = {};
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjDataContent,
  setObjDataDokumenLampiran,
  setObjDataCatatanNegosiasi,
  setObjDataWorkflow,
  setObjDataHistoryWorkflow,
  setObjPayloadTanggapan,
  setObjPayloadHasilEvaluasi,
  setValidationErrors,
  resetObjDataContent,
  resetObjDataDokumenLampiran,
  resetObjDataCatatanNegosiasi,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetObjPayloadTanggapan,
  resetObjPayloadHasilEvaluasi,
  resetValidationErrors,
} = evaluasiActionPlanRPMQualityAssuranceSlice.actions;

export default evaluasiActionPlanRPMQualityAssuranceSlice.reducer;
