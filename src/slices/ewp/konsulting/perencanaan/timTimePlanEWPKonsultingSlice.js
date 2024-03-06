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

export const timTimePlanEWPKonsultingSlice = createSlice({
  name: "timTimePlanEWPKonsulting",
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
} = timTimePlanEWPKonsultingSlice.actions;

export default timTimePlanEWPKonsultingSlice.reducer;
