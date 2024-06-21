import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataTableInternal: [],
  objDataTableEksternal: [],
  objDataTableObjekAudit: [],
  objDataFilterModalInternal: {},
  objDataPicAnalisator: [],
  objPayloadInternal: [],
  objPayloadEksternal: {},
  objPayloadEditProject: {},
  validationErrorsInternal: {},
  validationErrorsEksternal: {},
  validationErrorsEditProject: {},
};

export const analisisPerencanaanAddendumUtamaEWPQualityAssuranceSlice =
  createSlice({
    name: "analisisPerencanaanAddendumUtamaEWPQualityAssurance",
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
      setObjDataPicAnalisator: (state, action) => {
        state.objDataPicAnalisator = action.payload;
      },
      setObjPayloadInternal: (state, action) => {
        state.objPayloadInternal = action.payload;
      },
      setObjPayloadEksternal: (state, action) => {
        state.objPayloadEksternal = action.payload;
      },
      setObjPayloadEditProject: (state, action) => {
        state.objPayloadEditProject = action.payload;
      },
      setValidationErrorsInternal: (state, action) => {
        state.validationErrorsInternal = action.payload;
      },
      setValidationErrorsEksternal: (state, action) => {
        state.validationErrorsEksternal = action.payload;
      },
      setValidationErrorsEditProject: (state, action) => {
        state.validationErrorsEditProject = action.payload;
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
      resetObjDataPicAnalisator: (state) => {
        state.objDataPicAnalisator = [];
      },
      resetObjPayloadInternal: (state) => {
        state.objPayloadInternal = [];
      },
      resetObjPayloadEksternal: (state) => {
        state.objPayloadEksternal = {};
      },
      resetObjPayloadEditProject: (state) => {
        state.objPayloadEditProject = {};
      },
      resetValidationErrorsInternal: (state) => {
        state.validationErrorsInternal = {};
      },
      resetValidationErrorsEksternal: (state) => {
        state.validationErrorsEksternal = {};
      },
      resetValidationErrorsEditProject: (state) => {
        state.validationErrorsEditProject = {};
      },
    },
  });

export const {
  setObjDataTableInternal,
  setObjDataTableEksternal,
  setObjDataTableObjekAudit,
  setObjDataFilterModalInternal,
  setObjDataPicAnalisator,
  setObjPayloadInternal,
  setObjPayloadEksternal,
  setObjPayloadEditProject,
  setValidationErrorsInternal,
  setValidationErrorsEksternal,
  setValidationErrorsEditProject,
  resetObjDataTableInternal,
  resetObjDataTableEksternal,
  resetObjDataTableObjekAudit,
  resetObjDataFilterModalInternal,
  resetObjDataPicAnalisator,
  resetObjPayloadInternal,
  resetObjPayloadEksternal,
  resetObjPayloadEditProject,
  resetValidationErrorsInternal,
  resetValidationErrorsEksternal,
  resetValidationErrorsEditProject,
} = analisisPerencanaanAddendumUtamaEWPQualityAssuranceSlice.actions;

export default analisisPerencanaanAddendumUtamaEWPQualityAssuranceSlice.reducer;
