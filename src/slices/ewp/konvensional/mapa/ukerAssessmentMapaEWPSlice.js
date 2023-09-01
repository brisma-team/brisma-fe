import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ukerAssessmentData: [],
  countTypeUker: [],
  validationErrors: {},
};

export const ukerAssessmentMapaEWPSlice = createSlice({
  name: "ukerAssessmentMapaEWP",
  initialState,
  reducers: {
    setUkerAssessmentData: (state, action) => {
      state.ukerAssessmentData = action.payload;
    },
    setCountTypeUker: (state, action) => {
      state.countTypeUker = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setUkerAssessmentData,
  setCountTypeUker,
  setValidationErrors,
  resetValidationErrors,
} = ukerAssessmentMapaEWPSlice.actions;

export default ukerAssessmentMapaEWPSlice.reducer;
