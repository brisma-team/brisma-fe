import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {
    auditor: [],
    desc: [],
  },
  defaultObjData: {
    auditor: [],
    desc: [],
  },
  validationErrors: {},
};

export const tindakLanjutEWPMonoffSlice = createSlice({
  name: "tindakLanjutEWPMonoff",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = { ...state.defaultObjData };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setValidationErrors,
  resetObjData,
  resetValidationErrors,
} = tindakLanjutEWPMonoffSlice.actions;

export default tindakLanjutEWPMonoffSlice.reducer;
