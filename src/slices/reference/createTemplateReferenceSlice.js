import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCategory: [],
  workflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
  },
  historyWorkflow: [],
  payloadInformasi: {
    judul: "",
    deskripsi: "",
    project_template_id: "",
    jenis_survey_kode: "",
    jenis_survey_name: "",
  },
  payloadKuesioner: [],
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
  workflowDefaultData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    ref_tim_audit_signer: [],
    note: "",
  },
  defaultPayloadInformasi: {
    judul: "",
    deskripsi: "",
    project_template_id: "",
    jenis_survey_kode: "",
    jenis_survey_name: "",
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
  validationErrorsWorkflow: {},
  validationErrorsKuesioner: {},
};

export const createTemplateReferenceSlice = createSlice({
  name: "createTemplateReference",
  initialState,
  reducers: {
    setDataCategory: (state, action) => {
      state.dataCategory = action.payload;
    },
    setWorkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setHistoryWorkflow: (state, action) => {
      state.historyWorkflow = action.payload;
    },
    setPayloadInformasi: (state, action) => {
      state.payloadInformasi = action.payload;
    },
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    setPayloadPertanyaan: (state, action) => {
      state.payloadPertanyaan = action.payload;
    },
    setValidationErrorsWorkflow: (state, action) => {
      state.validationErrorsWorkflow = action.payload;
    },
    setValidationErrorsKuesioner: (state, action) => {
      state.validationErrorsKuesioner = action.payload;
    },
    resetDataCategory: (state) => {
      state.dataCategory = [];
    },
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetHistoryWorkflow: (state) => {
      state.historyWorkflow = [];
    },
    resetPayloadInformasi: (state) => {
      state.payloadInformasi = { ...state.defaultPayloadInformasi };
    },
    resetPayloadPertanyaan: (state) => {
      state.payloadPertanyaan = { ...state.defaultPayloadPertanyaan };
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
    resetValidationErrorsWorkflow: (state) => {
      state.validationErrorsWorkflow = {};
    },
    resetValidationErrorsKuesioner: (state) => {
      state.validationErrorsKuesioner = {};
    },
  },
});

export const {
  setDataCategory,
  setWorkflowData,
  setHistoryWorkflow,
  setPayloadInformasi,
  setPayloadKuesioner,
  setPayloadPertanyaan,
  setValidationErrorsWorkflow,
  setValidationErrorsKuesioner,
  resetDataCategory,
  resetWorkflowData,
  resetPayloadInformasi,
  resetPayloadPertanyaan,
  resetPayloadKuesioner,
  resetValidationErrorsWorkflow,
  resetValidationErrorsKuesioner,
  resetHistoryWorkflow,
} = createTemplateReferenceSlice.actions;

export default createTemplateReferenceSlice.reducer;
