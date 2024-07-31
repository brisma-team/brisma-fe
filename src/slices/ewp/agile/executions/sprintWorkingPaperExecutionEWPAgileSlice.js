import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataWorkingPaper: [],
};

export const sprintWorkingPaperExecutionEWPAgileSlice = createSlice({
  name: "sprintWorkingPaperExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataWorkingPaper: (state, action) => {
      state.objDataWorkingPaper = action.payload;
    },
    resetObjDataWorkingPaper: (state) => {
      state.objDataWorkingPaper = [];
    },
  },
});

export const { setObjDataWorkingPaper, resetObjDataWorkingPaper } =
  sprintWorkingPaperExecutionEWPAgileSlice.actions;

export default sprintWorkingPaperExecutionEWPAgileSlice.reducer;
