import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {},
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
  workflowData: {
    sub_modul: "",
    sub_modul_id: "",
    pic: "",
    ref_tim_audit_approver: [],
    note: "",
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
};

export const penilaianSurveySlice = createSlice({
  name: "penilaianSurvey",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
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
    setHistoryWorkflow: (state, action) => {
      state.historyWorkflow = action.payload;
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
    resetWorkflowData: (state) => {
      state.workflowData = { ...state.workflowDefaultData };
    },
    resetHistoryWorkflow: (state) => {
      state.historyWorkflow = [];
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
  },
});

export const {
  setObjData,
  setPayloadInformasi,
  setPayloadKuesioner,
  setWorkflowData,
  setValidationErrorsWorkflow,
  setHistoryWorkflow,
  resetPayloadInformasi,
  resetPayloadKuesioner,
  resetWorkflowData,
  resetHistoryWorkflow,
  resetValidationErrorsWorkflow,
} = penilaianSurveySlice.actions;

export default penilaianSurveySlice.reducer;
