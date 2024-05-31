import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {},
  objPayload: {},
  validationErrors: {},
};

export const timOverviewRPMQualityAssuranceSlice = createSlice({
  name: "timOverviewRPMQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = {};
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
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} = timOverviewRPMQualityAssuranceSlice.actions;

export default timOverviewRPMQualityAssuranceSlice.reducer;
