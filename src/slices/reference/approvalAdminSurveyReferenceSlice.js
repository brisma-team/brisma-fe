import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTablesApprovalQueue: [],
  dataTablesHistory: [],
};

export const approvalAdminSurveyReferenceSlice = createSlice({
  name: "approvalAdminSurveyReference",
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
  approvalAdminSurveyReferenceSlice.actions;

export default approvalAdminSurveyReferenceSlice.reducer;
