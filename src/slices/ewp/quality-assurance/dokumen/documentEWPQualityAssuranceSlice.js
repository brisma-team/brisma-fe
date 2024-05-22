import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    document_name: "",
    file_name: "",
    file_url: "",
    desc: "",
    ref_document_id: "",
    ref_document_name: "",
  },
  defaultObjPayload: {
    document_name: "",
    file_name: "",
    file_url: "",
    desc: "",
    ref_document_id: "",
    ref_document_name: "",
  },
  validationErrors: {},
};

export const documentEWPQualityAssuranceSlice = createSlice({
  name: "documentEWPQualityAssurance",
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
} = documentEWPQualityAssuranceSlice.actions;

export default documentEWPQualityAssuranceSlice.reducer;
