import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataTeam: [],
  objDataContent: {},
  objPayload: {},
  validationErrors: {},
};

export const evaluasiRPMQualityAssuranceSlice = createSlice({
  name: "evaluasiRPMQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataTeam: (state, action) => {
      state.objDataTeam = action.payload;
    },
    setObjDataContent: (state, action) => {
      state.objDataContent = action.payload;
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
    resetObjDataTeam: (state) => {
      state.objDataTeam = [];
    },
    resetObjDataContent: (state) => {
      state.objDataContent = {};
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
  setObjDataTeam,
  setObjDataContent,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataTeam,
  resetObjDataContent,
  resetObjPayload,
  resetValidationErrors,
} = evaluasiRPMQualityAssuranceSlice.actions;

export default evaluasiRPMQualityAssuranceSlice.reducer;
