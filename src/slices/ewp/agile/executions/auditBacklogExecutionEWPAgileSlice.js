import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
};

export const auditBacklogExecutionEWPAgileSlice = createSlice({
  name: "auditBacklogExecutionEWPAgile",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
  },
});

export const { setObjData, resetObjData } =
  auditBacklogExecutionEWPAgileSlice.actions;

export default auditBacklogExecutionEWPAgileSlice.reducer;
