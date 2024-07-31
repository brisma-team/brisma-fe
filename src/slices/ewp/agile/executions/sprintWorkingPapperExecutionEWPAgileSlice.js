import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataWorkingPapper: [],
};

export const sprintWorkingPapperExecutionEWPAgileSlice = createSlice({
  name: "sprintWorkingPapperExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataWorkingPapper: (state, action) => {
      state.objDataWorkingPapper = action.payload;
    },
    resetObjDataWorkingPapper: (state) => {
      state.objDataWorkingPapper = [];
    },
  },
});

export const { setObjDataWorkingPapper, resetObjDataWorkingPapper } =
  sprintWorkingPapperExecutionEWPAgileSlice.actions;

export default sprintWorkingPapperExecutionEWPAgileSlice.reducer;
