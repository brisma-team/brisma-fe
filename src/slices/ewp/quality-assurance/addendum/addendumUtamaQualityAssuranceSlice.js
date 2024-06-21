import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataContentTim: {},
  objDataContentUkerAssessment: [],
  objDataContentRingkasan: [],
  objDataContentDetailRingkasan: {},
  objPayloadUkerAssessment: {},
  objPayloadRingkasan: {},
  validationErrorsTim: {},
  validationErrorsRingkasan: {},
};

export const addendumUtamaQualityAssuranceSlice = createSlice({
  name: "addendumUtamaQualityAssurance",
  initialState,
  reducers: {
    setObjDataContentTim: (state, action) => {
      state.objDataContentTim = action.payload;
    },
    setObjDataContentUkerAssessment: (state, action) => {
      state.objDataContentUkerAssessment = action.payload;
    },
    setObjDataContentRingkasan: (state, action) => {
      state.objDataContentRingkasan = action.payload;
    },
    setObjDataContentDetailRingkasan: (state, action) => {
      state.objDataContentDetailRingkasan = action.payload;
    },
    setObjPayloadRingkasan: (state, action) => {
      state.objPayloadRingkasan = action.payload;
    },
    setObjPayloadUkerAssessment: (state, action) => {
      state.objPayloadUkerAssessment = action.payload;
    },
    setValidationErrorsTim: (state, action) => {
      state.validationErrorsTim = action.payload;
    },
    setValidationErrorsRingkasan: (state) => {
      state.validationErrorsRingkasan = {};
    },
    resetObjDataContentTim: (state) => {
      state.objDataContentTim = [];
    },
    resetObjDataContentUkerAssessment: (state) => {
      state.objDataContentUkerAssessment = [];
    },
    resetObjDataContentRingkasan: (state) => {
      state.objDataContentRingkasan = [];
    },
    resetObjDataContentDetailRingkasan: (state) => {
      state.objDataContentDetailRingkasan = {};
    },
    resetObjPayloadUkerAssessment: (state) => {
      state.objPayloadUkerAssessment = {};
    },
    resetObjPayloadRingkasan: (state) => {
      state.objPayloadRingkasan = {};
    },
    resetValidationErrorsTim: (state) => {
      state.validationErrorsTim = {};
    },
    resetValidationErrorsRingkasan: (state) => {
      state.validationErrorsRingkasan = {};
    },
  },
});

export const {
  setObjDataContentTim,
  setObjDataContentUkerAssessment,
  setObjDataContentRingkasan,
  setObjDataContentDetailRingkasan,
  setObjPayloadUkerAssessment,
  setObjPayloadRingkasan,
  setValidationErrorsTim,
  setValidationErrorsRingkasan,
  resetObjDataContentTim,
  resetObjDataContentUkerAssessment,
  resetObjDataContentRingkasan,
  resetObjDataContentDetailRingkasan,
  resetObjPayloadUkerAssessment,
  resetObjPayloadRingkasan,
  resetValidationErrorsTim,
  resetValidationErrorsRingkasan,
} = addendumUtamaQualityAssuranceSlice.actions;

export default addendumUtamaQualityAssuranceSlice.reducer;
