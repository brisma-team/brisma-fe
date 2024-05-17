import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {},
  validationErrors: {},
};

export const actionPlanEWPQualityAssuranceSlice = createSlice({
  name: "actionPlanEWPQualityAssurance",
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
      state.objPayload = {};
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
} = actionPlanEWPQualityAssuranceSlice.actions;

export default actionPlanEWPQualityAssuranceSlice.reducer;
