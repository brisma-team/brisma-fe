import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {
    initiator: [],
    auditor: [],
    auditee: [],
    ata: [],
  },
  defaultObjData: {
    initiator: [],
    auditor: [],
    auditee: [],
    ata: [],
  },
  validationErrors: {},
};

export const timEWPMonoffSlice = createSlice({
  name: "timEWPMonoff",
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
} = timEWPMonoffSlice.actions;

export default timEWPMonoffSlice.reducer;
