import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payloadKuesioner: [],
};

export const previewSurveySlice = createSlice({
  name: "previewSurvey",
  initialState,
  reducers: {
    setPayloadKuesioner: (state, action) => {
      state.payloadKuesioner = action.payload;
    },
    resetPayloadKuesioner: (state) => {
      state.payloadKuesioner = [];
    },
  },
});

export const { setPayloadKuesioner, resetPayloadKuesioner } =
  previewSurveySlice.actions;

export default previewSurveySlice.reducer;
