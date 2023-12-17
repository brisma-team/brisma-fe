import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTablesApprovalQueue: [],
  dataTablesHistory: [],
};

export const approvalInitiatorSurveySlice = createSlice({
  name: "approvalInitiatorSurvey",
  initialState,
  reducers: {
    setDataTablesApprovalQueue: (state, action) => {
      state.dataTablesApprovalQueue = action.payload;
    },
    setDataTablesHistory: (state, action) => {
      state.dataTablesHistory = action.payload;
    },
  },
});

export const { setDataTablesApprovalQueue, setDataTablesHistory } =
  approvalInitiatorSurveySlice.actions;

export default approvalInitiatorSurveySlice.reducer;
