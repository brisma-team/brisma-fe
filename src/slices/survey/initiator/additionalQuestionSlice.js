import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payloadKuesioner: [],
  payloadPertanyaan: {
    id: "",
    template_id: "",
    guideline: "",
    tipe_pertanyaan_kode: "",
    tipe_pertanyaan_name: "",
    uraian: "",
    is_need_deskripsi: false,
    is_default: 0,
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
    is_default: 0,
    bobot: 0,
    jawaban: [{ bobot: 0, text: "" }],
  },
  validationErrorsKuesioner: {},
};

export const additionalQuestionSurveySlice = createSlice({
  name: "additionalQuestionSurvey",
  initialState,
  reducers: {
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    setPayloadPertanyaan: (state, action) => {
      state.payloadPertanyaan = action.payload;
    },
    setValidationErrorsKuesioner: (state, action) => {
      state.validationErrorsKuesioner = action.payload;
    },
    resetPayloadPertanyaan: (state) => {
      state.payloadPertanyaan = { ...state.defaultPayloadPertanyaan };
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
    resetValidationErrorsKuesioner: (state) => {
      state.validationErrorsKuesioner = {};
    },
  },
});

export const {
  setPayloadKuesioner,
  setPayloadPertanyaan,
  setValidationErrorsKuesioner,
  resetPayloadPertanyaan,
  resetPayloadKuesioner,
  resetValidationErrorsKuesioner,
} = additionalQuestionSurveySlice.actions;

export default additionalQuestionSurveySlice.reducer;
