import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCategory: [],
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
    jawaban: [],
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
    jawaban: [],
  },
};

export const createTemplateReferenceSlice = createSlice({
  name: "createTemplateReference",
  initialState,
  reducers: {
    setDataCategory: (state, action) => {
      state.dataCategory = action.payload;
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
    resetDataCategory: (state) => {
      state.dataCategory = [];
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
  },
});

export const {
  setDataCategory,
  setPayloadInformasi,
  setPayloadKuesioner,
  setPayloadPertanyaan,
  resetDataCategory,
  resetPayloadInformasi,
  resetPayloadPertanyaan,
  resetPayloadKuesioner,
} = createTemplateReferenceSlice.actions;

export default createTemplateReferenceSlice.reducer;
