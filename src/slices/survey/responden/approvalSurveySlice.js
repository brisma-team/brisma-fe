import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTablesApprovalQueue: [],
  dataTablesHistory: [],
};

export const approvalRespondenSurveySlice = createSlice({
  name: "approvalRespondenSurvey",
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
  approvalRespondenSurveySlice.actions;

export default approvalRespondenSurveySlice.reducer;
