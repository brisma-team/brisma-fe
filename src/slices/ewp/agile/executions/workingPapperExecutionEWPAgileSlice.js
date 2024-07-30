import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataWorkingPapper: [],
};

export const workingPapperExecutionEWPAgileSlice = createSlice({
  name: "workingPapperExecutionEWPAgile",
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
  workingPapperExecutionEWPAgileSlice.actions;

export default workingPapperExecutionEWPAgileSlice.reducer;
