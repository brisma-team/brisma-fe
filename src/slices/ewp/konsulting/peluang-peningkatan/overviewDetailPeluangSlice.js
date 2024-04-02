import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataPicControl: [],
  objPayload: {
    judul_kkpt: "",
    auditor: {},
  },
  defaultObjPayload: {
    judul_kkpt: "",
    auditor: {},
  },
  validationErrors: {},
};

export const overviewDetailPeluangSlice = createSlice({
  name: "overviewDetailPeluang",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataPicControl: (state, action) => {
      state.objDataPicControl = action.payload;
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
    resetObjDataPicControl: (state) => {
      state.objDataPicControl = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = { ...state.defaultObjPayload };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjDataPicControl,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataPicControl,
  resetObjPayload,
  resetValidationErrors,
} = overviewDetailPeluangSlice.actions;

export default overviewDetailPeluangSlice.reducer;
