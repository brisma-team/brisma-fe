import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payloadInformasi: {
    judul: "",
    deskripsi: "",
    project_template_id: "",
    jenis_survey_kode: "",
    jenis_survey_name: "",
  },
  payloadKuesioner: [],
};

export const previewTemplateReferenceSlice = createSlice({
  name: "previewTemplateReference",
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
} = previewTemplateReferenceSlice.actions;

export default previewTemplateReferenceSlice.reducer;
