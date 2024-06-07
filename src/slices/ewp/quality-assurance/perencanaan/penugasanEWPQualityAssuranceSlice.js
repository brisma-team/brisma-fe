import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataTeam: [],
  objPayload: [],
  validationErrors: {},
};

export const penugasanEWPQualityAssuranceSlice = createSlice({
  name: "penugasanEWPQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataTeam: (state, action) => {
      state.objDataTeam = action.payload;
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
    resetObjPayload: (state) => {
      state.objPayload = [];
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjDataTeam,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataTeam,
  resetObjPayload,
  resetValidationErrors,
} = penugasanEWPQualityAssuranceSlice.actions;

export default penugasanEWPQualityAssuranceSlice.reducer;
