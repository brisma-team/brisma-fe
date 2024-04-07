import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataPemeriksaan: [],
  objDataPicControl: [],
  objPayloadLingkupPemeriksaan: {},
  objPayloadRisk: {},
  objPayloadControl: [],
  validationErrorsLingkupPemeriksaan: {},
  validationErrorsRisk: {},
  validationErrorsControl: {},
};

export const programKerjaAddendumEWPKonsultingSlice = createSlice({
  name: "programKerjaAddendumEWPKonsulting",
  initialState,
  reducers: {
    setObjDataPemeriksaan: (state, action) => {
      state.objDataPemeriksaan = action.payload;
    },
    setObjDataPicControl: (state, action) => {
      state.objDataPicControl = action.payload;
    },
    setObjPayloadLingkupPemeriksaan: (state, action) => {
      state.objPayloadLingkupPemeriksaan = action.payload;
    },
    setObjPayloadRisk: (state, action) => {
      state.objPayloadRisk = action.payload;
    },
    setObjPayloadControl: (state, action) => {
      state.objPayloadControl = action.payload;
    },
    setValidationErrorsLingkupPemeriksaan: (state, action) => {
      state.validationErrorsLingkupPemeriksaan = action.payload;
    },
    setValidationErrorsRisk: (state, action) => {
      state.validationErrorsRisk = action.payload;
    },
    setValidationErrorsControl: (state, action) => {
      state.validationErrorsControl = action.payload;
    },
    resetObjDataPemeriksaan: (state) => {
      state.objDataPemeriksaan = [];
    },
    resetObjDataPicControl: (state) => {
      state.objDataPicControl = [];
    },
    resetObjPayloadLingkupPemeriksaan: (state) => {
      state.objPayloadLingkupPemeriksaan = {};
    },
    resetObjPayloadRisk: (state) => {
      state.objPayloadRisk = {};
    },
    resetObjPayloadControl: (state) => {
      state.objPayloadControl = [];
    },
    resetValidationErrorsLingkupPemeriksaan: (state) => {
      state.validationErrorsLingkupPemeriksaan = {};
    },
    resetValidationErrorsRisk: (state) => {
      state.validationErrorsRisk = {};
    },
    resetValidationErrorsControl: (state) => {
      state.validationErrorsControl = {};
    },
  },
});

export const {
  setObjDataPemeriksaan,
  setObjDataPicControl,
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjDataPemeriksaan,
  resetObjDataPicControl,
  resetObjPayloadLingkupPemeriksaan,
  resetObjPayloadRisk,
  resetObjPayloadControl,
  resetValidationErrorsLingkupPemeriksaan,
  resetValidationErrorsRisk,
  resetValidationErrorsControl,
} = programKerjaAddendumEWPKonsultingSlice.actions;

export default programKerjaAddendumEWPKonsultingSlice.reducer;
