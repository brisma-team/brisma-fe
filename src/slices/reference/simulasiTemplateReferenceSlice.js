import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCategory: [],
  payloadSimulasi: [],
  payloadKuesioner: [],
  payloadKuesionerFromRedis: [],
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
  validationErrors: "",
};

export const simulasiTemplateReferenceSlice = createSlice({
  name: "simulasiTemplateReference",
  initialState,
  reducers: {
    setDataCategory: (state, action) => {
      state.dataCategory = action.payload;
    },
    setPayloadSimulasi: (state, action) => {
      state.payloadSimulasi = action.payload;
    },
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    setPayloadKuesionerFromRedis: (state, action) => {
      state.payloadKuesionerFromRedis = action.payload;
    },
    setPayloadInformasi: (state, action) => {
      state.payloadInformasi = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetDataCategory: (state) => {
      state.dataCategory = [];
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setDataCategory,
  setPayloadSimulasi,
  setPayloadKuesioner,
  setPayloadKuesionerFromRedis,
  setPayloadInformasi,
  setValidationErrors,
  resetDataCategory,
  resetPayloadKuesioner,
  resetValidationErrors,
} = simulasiTemplateReferenceSlice.actions;

export default simulasiTemplateReferenceSlice.reducer;
