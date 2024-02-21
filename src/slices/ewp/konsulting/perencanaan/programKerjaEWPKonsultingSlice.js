import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
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
    setObjData: (state, action) => {
      state.objData = action.payload;
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
    resetObjData: (state) => {
      state.objData = [];
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
  setObjData,
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjData,
  resetObjPayloadLingkupPemeriksaan,
  resetObjPayloadRisk,
  resetObjPayloadControl,
  resetValidationErrorsLingkupPemeriksaan,
  resetValidationErrorsRisk,
  resetValidationErrorsControl,
} = programKerjaEWPKonsultingSlice.actions;

export default programKerjaEWPKonsultingSlice.reducer;
