import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataPemeriksaan: [],
  objDataRingkasan: [],
  objPayloadLingkupPemeriksaan: {},
  objPayloadRisk: {},
  objPayloadControl: [],
  validationErrorsLingkupPemeriksaan: {},
  validationErrorsRisk: {},
  validationErrorsControl: {},
};

export const programKerjaEWPKonsultingSlice = createSlice({
  name: "programKerjaEWPKonsulting",
  initialState,
  reducers: {
    setObjDataPemeriksaan: (state, action) => {
      state.objDataPemeriksaan = action.payload;
    },
    setObjDataRingkasan: (state, action) => {
      state.objDataRingkasan = action.payload;
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
    resetObjDataRingkasan: (state) => {
      state.objDataRingkasan = [];
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
  setObjDataRingkasan,
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjDataPemeriksaan,
  resetObjDataRingkasan,
  resetObjPayloadLingkupPemeriksaan,
  resetObjPayloadRisk,
  resetObjPayloadControl,
  resetValidationErrorsLingkupPemeriksaan,
  resetValidationErrorsRisk,
  resetValidationErrorsControl,
} = programKerjaEWPKonsultingSlice.actions;

export default programKerjaEWPKonsultingSlice.reducer;
