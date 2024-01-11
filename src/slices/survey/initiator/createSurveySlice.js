import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {},
  workflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  historyWorkflow: [],
  payloadInformasi: {
    nama_survey: "",
    deskripsi: "",
    catatan: "",
    jenis_survey_kode: "",
    jenis_survey_name: "",
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    ref_template_id: "",
    ref_template_name: "",
    ref_template_desc: "",
  },
  workflowDefaultData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  defaultPayloadInformasi: {
    nama_survey: "",
    deskripsi: "",
    catatan: "",
    jenis_survey_kode: "",
    jenis_survey_name: "",
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    ref_template_id: "",
    ref_template_desc: "",
  },
  payloadKuesioner: [],
  validationErrorsWorkflow: {},
  payloadPertanyaan: {
    id: "",
    template_id: "",
    guideline: "",
    tipe_pertanyaan_kode: "",
    tipe_pertanyaan_name: "",
    uraian: "",
    is_need_deskripsi: false,
    bobot: 0,
    jawaban: [{ bobot: 0, text: "" }],
  },

  defaultPayloadPertanyaan: {
    id: "",
    template_id: "",
    guideline: "",
    tipe_pertanyaan_kode: "",
    tipe_pertanyaan_name: "",
    uraian: "",
    is_need_deskripsi: false,
    bobot: 0,
    jawaban: [{ bobot: 0, text: "" }],
  },

  // [START] workflow extension request
  historyWorkflowExtensionRequest: [],
  workflowExtensionRequest: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
    reason: "",
    pelaksanaan_start: "",
    pelaksanaan_end: "",
  },
  defaultWorkflowExtensionRequest: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
    reason: "",
    pelaksanaan_start: "",
    pelaksanaan_end: "",
  },
  validationErrorsWorkflowExtensionRequest: {},
  // [END] workflow extension request

  // [START] workflow terminate request
  historyWorkflowTerminateRequest: [],
  workflowTerminateRequest: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  defaultWorkflowTerminateRequest: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  validationErrorsWorkflowTerminateRequest: {},
  // [END] workflow terminate request
};

export const createSurveySlice = createSlice({
  name: "createSurvey",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setPayloadPertanyaan: (state, action) => {
      state.payloadPertanyaan = action.payload;
    },
    setPayloadInformasi: (state, action) => {
      state.payloadInformasi = action.payload;
    },
    resetPayloadInformasi: (state) => {
      state.payloadInformasi = { ...state.defaultPayloadInformasi };
    },
    setWorkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setWorkflowExtensionRequest: (state, action) => {
      state.workflowExtensionRequest = action.payload;
    },
    setWorkflowTerminateRequest: (state, action) => {
      state.workflowTerminateRequest = action.payload;
    },
    setHistoryWorkflow: (state, action) => {
      state.historyWorkflow = action.payload;
    },
    setHistoryWorkflowExtensionRequest: (state, action) => {
      state.historyWorkflowExtensionRequest = action.payload;
    },
    setHistoryWorkflowTerminateRequest: (state, action) => {
      state.historyWorkflowTerminateRequest = action.payload;
    },
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    setValidationErrorsWorkflowExtensionRequest: (state, action) => {
      state.validationErrorsWorkflowExtensionRequest = action.payload;
    },
    setValidationErrorsWorkflowTerminateRequest: (state, action) => {
      state.validationErrorsWorkflowTerminateRequest = action.payload;
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetWorkflowExtensionRequest: (state) => {
      state.workflowExtensionRequest = {
        ...state.defaultWorkflowExtensionRequest,
      };
    },
    resetWorkflowTerminateRequest: (state) => {
      state.workflowTerminateRequest = {
        ...state.defaultWorkflowTerminateRequest,
      };
    },
    resetHistoryWorkflow: (state) => {
      state.historyWorkflow = [];
    },
    resetHistoryWorkflowExtensionRequest: (state) => {
      state.historyWorkflowExtensionRequest = [];
    },
    resetHistoryWorkflowTerminateRequest: (state) => {
      state.historyWorkflowTerminateRequest = [];
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
    resetValidationErrorsWorkflowExtensionRequest: (state) => {
      state.validationErrorsWorkflowExtensionRequest = {};
    },
    resetValidationErrorsWorkflowTerminateRequest: (state) => {
      state.validationErrorsWorkflowTerminateRequest = {};
    },
    resetPayloadPertanyaan: (state) => {
      state.payloadPertanyaan = { ...state.defaultPayloadPertanyaan };
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
  },
});

export const {
  setObjData,
  setPayloadInformasi,
  setPayloadKuesioner,
  setWorkflowData,
  setWorkflowExtensionRequest,
  setWorkflowTerminateRequest,
  setValidationErrorsWorkflow,
  setValidationErrorsWorkflowExtensionRequest,
  setValidationErrorsWorkflowTerminateRequest,
  setHistoryWorkflow,
  setHistoryWorkflowExtensionRequest,
  setHistoryWorkflowTerminateRequest,
  resetPayloadInformasi,
  resetPayloadKuesioner,
  resetWorkflowData,
  resetWorkflowExtensionRequest,
  resetWorkflowTerminateRequest,
  resetHistoryWorkflow,
  resetHistoryWorkflowExtensionRequest,
  resetHistoryWorkflowTerminateRequest,
  resetValidationErrorsWorkflow,
  resetValidationErrorsWorkflowExtensionRequest,
  resetValidationErrorsWorkflowTerminateRequest,
} = createSurveySlice.actions;

export default createSurveySlice.reducer;
