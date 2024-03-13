import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    judul_meeting: "",
    desc: "",
    periode_start: "",
    periode_end: "",
    link_meeting: "",
    pic_meeting: [],
    pembicara_meeting: [],
    metode_meeting: {
      kode: "",
      nama: "",
    },
  },
  defaultObjPayload: {
    judul_meeting: "",
    desc: "",
    periode_start: "",
    periode_end: "",
    link_meeting: "",
    pic_meeting: [],
    pembicara_meeting: [],
    metode_meeting: {
      kode: "",
      nama: "",
    },
  },
  validationErrors: {},
};

export const overviewMeetingEWPKonsultingSlice = createSlice({
  name: "overviewMeetingEWPKonsulting",
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
} = overviewMeetingEWPKonsultingSlice.actions;

export default overviewMeetingEWPKonsultingSlice.reducer;
