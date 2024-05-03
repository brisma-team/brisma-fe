import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payloadKuesioner: [],
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
};

export const previewTemplateSurveyEWPQualityAssuranceSlice = createSlice({
  name: "previewTemplateSurveyEWPQualityAssurance",
  initialState,
  reducers: {
    setPayloadInformasi: (state, action) => {
      state.payloadInformasi = action.payload;
    },
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
  },
});

export const {
  setPayloadInformasi,
  setPayloadKuesioner,
  resetPayloadKuesioner,
} = previewTemplateSurveyEWPQualityAssuranceSlice.actions;

export default previewTemplateSurveyEWPQualityAssuranceSlice.reducer;
