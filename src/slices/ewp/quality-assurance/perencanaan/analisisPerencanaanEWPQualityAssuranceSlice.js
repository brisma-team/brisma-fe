import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataTableInternal: [],
  objDataTableEksternal: [],
  objDataTableObjekAudit: [],
  objDataFilterModalInternal: {},
  objPayloadInternal: [],
  objPayloadEksternal: {},
  validationErrorsInternal: {},
  validationErrorsEksternal: {},
};

export const analisisPerencanaanEWPQualityAssuranceSlice = createSlice({
  name: "analisisPerencanaanEWPQualityAssurance",
  initialState,
  reducers: {
    setObjDataTableInternal: (state, action) => {
      state.objDataTableInternal = action.payload;
    },
    setObjDataTableEksternal: (state, action) => {
      state.objDataTableEksternal = action.payload;
    },
    setObjDataTableObjekAudit: (state, action) => {
      state.objDataTableObjekAudit = action.payload;
    },
    setObjDataFilterModalInternal: (state, action) => {
      state.objDataFilterModalInternal = action.payload;
    },
    setObjPayloadInternal: (state, action) => {
      state.objPayloadInternal = action.payload;
    },
    setObjPayloadEksternal: (state, action) => {
      state.objPayloadEksternal = action.payload;
    },
    setValidationErrorsInternal: (state, action) => {
      state.validationErrorsInternal = action.payload;
    },
    setValidationErrorsEksternal: (state, action) => {
      state.validationErrorsEksternal = action.payload;
    },
    resetObjDataTableInternal: (state) => {
      state.objDataTableInternal = [];
    },
    resetObjDataTableEksternal: (state) => {
      state.objDataTableEksternal = [];
    },
    resetObjDataTableObjekAudit: (state) => {
      state.objDataTableObjekAudit = [];
    },
    resetObjDataFilterModalInternal: (state) => {
      state.objDataFilterModalInternal = [];
    },
    resetObjPayloadInternal: (state) => {
      state.objPayloadInternal = [];
    },
    resetObjPayloadEksternal: (state) => {
      state.objPayloadEksternal = {};
    },
    resetValidationErrorsInternal: (state) => {
      state.validationErrorsInternal = {};
    },
    resetValidationErrorsEksternal: (state) => {
      state.validationErrorsEksternal = {};
    },
  },
});

export const {
  setObjDataTableInternal,
  setObjDataTableEksternal,
  setObjDataTableObjekAudit,
  setObjDataFilterModalInternal,
  setObjPayloadInternal,
  setObjPayloadEksternal,
  setValidationErrorsInternal,
  setValidationErrorsEksternal,
  resetObjDataTableInternal,
  resetObjDataTableEksternal,
  resetObjDataTableObjekAudit,
  resetObjDataFilterModalInternal,
  resetObjPayloadInternal,
  resetObjPayloadEksternal,
  resetValidationErrorsInternal,
  resetValidationErrorsEksternal,
} = analisisPerencanaanEWPQualityAssuranceSlice.actions;

export default analisisPerencanaanEWPQualityAssuranceSlice.reducer;
