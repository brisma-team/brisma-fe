import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
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
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
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
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} = penugasanEWPQualityAssuranceSlice.actions;

export default penugasanEWPQualityAssuranceSlice.reducer;
