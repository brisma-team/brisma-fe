import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
  },
  defaultObjPayload: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
  },
  validationErrors: {},
};

export const ukerAssessmentEWPMonoffSlice = createSlice({
  name: "ukerAssessmentEWPMonoff",
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
} = ukerAssessmentEWPMonoffSlice.actions;

export default ukerAssessmentEWPMonoffSlice.reducer;
