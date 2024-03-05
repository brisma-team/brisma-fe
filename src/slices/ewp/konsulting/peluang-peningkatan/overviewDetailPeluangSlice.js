import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    judul_kkpt: "",
  },
  defaultObjPayload: {
    judul_kkpt: "",
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
      state.objPayload = { ...state.defaultObjPayload };
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
} = overviewDetailPeluangSlice.actions;

export default overviewDetailPeluangSlice.reducer;
