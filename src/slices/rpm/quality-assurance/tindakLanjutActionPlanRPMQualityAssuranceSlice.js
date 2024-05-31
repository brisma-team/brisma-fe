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
  objPayloadUploadDokumen: {},
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

export const tindakLanjutActionPlanRPMQualityAssuranceSlice = createSlice({
  name: "tindakLanjutActionPlanRPMQualityAssurance",
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
    setObjPayloadUploadDokumen: (state, action) => {
      state.objPayloadUploadDokumen = action.payload;
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
    resetObjPayloadUploadDokumen: (state) => {
      state.objPayloadUploadDokumen = {};
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
  setObjPayloadUploadDokumen,
  setValidationErrors,
  resetObjDataContent,
  resetObjDataDokumenLampiran,
  resetObjDataCatatanNegosiasi,
  resetObjDataWorkflow,
  resetObjDataHistoryWorkflow,
  resetObjPayloadTanggapan,
  resetObjPayloadUploadDokumen,
  resetValidationErrors,
} = tindakLanjutActionPlanRPMQualityAssuranceSlice.actions;

export default tindakLanjutActionPlanRPMQualityAssuranceSlice.reducer;
