import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {
    initiator: [],
    kta: [],
    ma: [],
    ata: [],
  },
  defaultObjData: {
    initiator: [],
    kta: [],
    ma: [],
    ata: [],
  },
  validationErrors: {},
};

export const timEWPQualityAssuranceSlice = createSlice({
  name: "timEWPQualityAssurance",
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
} = timEWPQualityAssuranceSlice.actions;

export default timEWPQualityAssuranceSlice.reducer;
