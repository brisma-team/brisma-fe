import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTables: {
    respondenPn: [],
    respondenUker: [],
    respondednUkerPn: [],
  },
  payloadNewResponden: {
    pn: "",
    name: "",
    keterangan: "",
  },
  payloadNewUker: {
    orgeh_kode: "",
    orgeh_name: "",
    keterangan: "",
  },
  defaultDataTables: {
    respondenPn: [],
    respondenUker: [],
    respondednUkerPn: [],
  },
  defaultPayloadNewResponden: {
    pn: "",
    name: "",
    keterangan: "",
  },
  defaultPayloadNewUker: {
    orgeh_kode: "",
    orgeh_name: "",
    keterangan: "",
  },
};

export const respondenSurveySlice = createSlice({
  name: "respondenSurvey",
  initialState,
  reducers: {
    setDataTables: (state, action) => {
      state.dataTables = action.payload;
    },
    setPayloadNewResponden: (state, action) => {
      state.payloadNewResponden = action.payload;
    },
    setPayloadNewUker: (state, action) => {
      state.payloadNewUker = action.payload;
    },
    resetDataTables: (state) => {
      state.dataTables = { ...state.defaultDataTables };
    },
    resetPayloadNewResponden: (state) => {
      state.payloadNewResponden = { ...state.defaultPayloadNewResponden };
    },
    resetPayloadNewUker: (state) => {
      state.payloadNewUker = { ...state.defaultPayloadNewUker };
    },
  },
});

export const {
  setDataTables,
  setPayloadNewResponden,
  setPayloadNewUker,
  resetDataTables,
  resetPayloadNewResponden,
  resetPayloadNewUker,
} = respondenSurveySlice.actions;

export default respondenSurveySlice.reducer;
