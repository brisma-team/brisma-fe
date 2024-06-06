import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataContent: {},
  objDataActionPlan: {},
  objPayload: {},
  validationErrors: {},
};

export const negosiasiRPMQualityAssuranceSlice = createSlice({
  name: "negosiasiRPMQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataContent: (state, action) => {
      state.objDataContent = action.payload;
    },
    setObjDataActionPlan: (state, action) => {
      state.objDataActionPlan = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjDataContent: (state) => {
      state.objDataContent = {};
    },
    resetObjDataActionPlan: (state) => {
      state.objDataActionPlan = {};
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
  setObjDataContent,
  setObjDataActionPlan,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataContent,
  resetObjDataActionPlan,
  resetObjPayload,
  resetValidationErrors,
} = negosiasiRPMQualityAssuranceSlice.actions;

export default negosiasiRPMQualityAssuranceSlice.reducer;
