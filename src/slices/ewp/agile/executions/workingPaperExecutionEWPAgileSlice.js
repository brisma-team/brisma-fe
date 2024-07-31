import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataWorkingPaper: {},
  objDataMenu: [],
};

export const workingPaperExecutionEWPAgileSlice = createSlice({
  name: "workingPaperExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataWorkingPaper: (state, action) => {
      state.objDataWorkingPaper = action.payload;
    },
    setObjDataMenu: (state, action) => {
      state.objDataMenu = action.payload;
    },
    resetObjDataWorkingPaper: (state) => {
      state.objDataWorkingPaper = [];
    },
    resetObjDataMenu: (state) => {
      state.objDataMenu = [];
    },
  },
});

export const {
  setObjDataWorkingPaper,
  setObjDataMenu,
  resetObjDataWorkingPaper,
  resetObjDataMenu,
} = workingPaperExecutionEWPAgileSlice.actions;

export default workingPaperExecutionEWPAgileSlice.reducer;
