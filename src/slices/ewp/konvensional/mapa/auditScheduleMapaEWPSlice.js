import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTables: [],
  payload: {
    penyusunan_mapa_plan_start: null,
    penyusunan_mapa_plan_end: null,
    entrance_meeting_plan_start: null,
    entrance_meeting_plan_end: null,
    pelaksanaan_audit_plan_start: null,
    pelaksanaan_audit_plan_end: null,
    exit_meeting_plan_start: null,
    exit_meeting_plan_end: null,
    Penyusunan_LHA_plan_start: null,
    Penyusunan_LHA_plan_end: null,
    Wrapup_Meeting_plan_start: null,
    Wrapup_Meeting_plan_end: null,
  },
  defaultPayload: {
    penyusunan_mapa_plan_start: null,
    penyusunan_mapa_plan_end: null,
    entrance_meeting_plan_start: null,
    entrance_meeting_plan_end: null,
    pelaksanaan_audit_plan_start: null,
    pelaksanaan_audit_plan_end: null,
    exit_meeting_plan_start: null,
    exit_meeting_plan_end: null,
    Penyusunan_LHA_plan_start: null,
    Penyusunan_LHA_plan_end: null,
    Wrapup_Meeting_plan_start: null,
    Wrapup_Meeting_plan_end: null,
  },
};

export const auditScheduleMapaEWPSlice = createSlice({
  name: "assignmentMapaEWP",
  initialState,
  reducers: {
    setDataTables: (state, action) => {
      state.dataTables = action.payload;
    },
    setPayload: (state, action) => {
      state.payload = action.payload;
    },
    resetDataTables: (state) => {
      state.dataTables = [];
    },
    resetPayload: (state) => {
      state.dataTables = { ...state.defaultPayload };
    },
  },
});

export const { setDataTables, setPayload, resetDataTables, resetPayload } =
  auditScheduleMapaEWPSlice.actions;

export default auditScheduleMapaEWPSlice.reducer;
