import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objPayload: {},
  validationErrors: {},
};

export const timOverviewRPMQualityAssuranceSlice = createSlice({
  name: "timOverviewRPMQualityAssurance",
  initialState,
  reducers: {
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjPayload: (state) => {
      state.objPayload = {};
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjPayload,
  setValidationErrors,
  resetObjPayload,
  resetValidationErrors,
} = timOverviewRPMQualityAssuranceSlice.actions;

export default timOverviewRPMQualityAssuranceSlice.reducer;
