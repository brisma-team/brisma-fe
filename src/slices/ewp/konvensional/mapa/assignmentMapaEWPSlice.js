import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTables: [],
  modalDataTables: [],
  payloadSample: [],
  payloadAssignment: {
    pn: "",
    name: "",
    mandays: undefined,
  },
  defaultPayloadAssignment: {
    pn: "",
    name: "",
    mandays: undefined,
  },
  validationErrors: {},
};

export const assignmentMapaEWPSlice = createSlice({
  name: "assignmentMapaEWP",
  initialState,
  reducers: {
    setDataTables: (state, action) => {
      state.dataTables = action.payload;
    },
    setModalDataTables: (state, action) => {
      state.modalDataTables = action.payload;
    },
    setPayloadSample: (state, action) => {
      state.payloadSample = action.payload;
    },
    setPayloadAssignment: (state, action) => {
      state.payloadAssignment = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetPayloadSample: (state) => {
      state.payloadSample = [];
    },
    resetPayloadAssignment: (state) => {
      state.payloadSample = { ...state.defaultPayloadAssignment };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setDataTables,
  setModalDataTables,
  setPayloadSample,
  setPayloadAssignment,
  setValidationErrors,
  resetPayloadSample,
  resetPayloadAssignment,
  resetValidationErrors,
} = assignmentMapaEWPSlice.actions;

export default assignmentMapaEWPSlice.reducer;
