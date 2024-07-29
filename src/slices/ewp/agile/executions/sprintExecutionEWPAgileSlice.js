import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataSprintExecution: [],
  objPayloadTeam: {},
  validationErrorsTeam: {},
};

export const sprintExecutionEWPAgileSlice = createSlice({
  name: "sprintExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataSprintExecution: (state, action) => {
      state.objDataSprintExecution = action.payload;
    },
    setObjPayloadTeam: (state, action) => {
      state.objPayloadTeam = action.payload;
    },
    setValidationErrorsTeam: (state, action) => {
      state.validationErrorsTeam = action.payload;
    },
    resetObjDataSprintExecution: (state) => {
      state.objDataSprintExecution = [];
    },
    resetObjPayloadTeam: (state) => {
      state.objPayloadTeam = {};
    },
    resetValidationErrorsTeam: (state) => {
      state.validationErrorsTeam = {};
    },
  },
});

export const {
  setObjDataSprintExecution,
  setObjPayloadTeam,
  setValidationErrorsTeam,
  resetObjDataSprintExecution,
  resetObjPayloadTeam,
  resetValidationErrorsTeam,
} = sprintExecutionEWPAgileSlice.actions;

export default sprintExecutionEWPAgileSlice.reducer;
