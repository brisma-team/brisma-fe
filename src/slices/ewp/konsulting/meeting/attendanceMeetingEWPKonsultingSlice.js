import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataAttendance: {},
  objDataMeeting: {},
  objPayload: {
    pn: "",
    password: "",
  },
  defaultObjPayload: {
    pn: "",
    password: "",
  },
  validationErrors: {},
};

export const attendanceMeetingEWPKonsultingSlice = createSlice({
  name: "attendanceMeetingEWPKonsulting",
  initialState,
  reducers: {
    setObjDataAttendance: (state, action) => {
      state.objDataAttendance = action.payload;
    },
    setObjDataMeeting: (state, action) => {
      state.objDataMeeting = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjDataAttendance: (state) => {
      state.objDataAttendance = {};
    },
    resetObjDataMeeting: (state) => {
      state.objDataMeeting = {};
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
  setObjDataAttendance,
  setObjDataMeeting,
  setObjPayload,
  setValidationErrors,
  resetObjDataAttendance,
  resetObjDataMeeting,
  resetObjPayload,
  resetValidationErrors,
} = attendanceMeetingEWPKonsultingSlice.actions;

export default attendanceMeetingEWPKonsultingSlice.reducer;
