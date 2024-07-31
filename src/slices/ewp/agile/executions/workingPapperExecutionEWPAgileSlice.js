import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataWorkingPapper: {},
  objDataMenu: [],
};

export const workingPapperExecutionEWPAgileSlice = createSlice({
  name: "workingPapperExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataWorkingPapper: (state, action) => {
      state.objDataWorkingPapper = action.payload;
    },
    setObjDataMenu: (state, action) => {
      state.objDataMenu = action.payload;
    },
    resetObjDataWorkingPapper: (state) => {
      state.objDataWorkingPapper = [];
    },
    resetObjDataMenu: (state) => {
      state.objDataMenu = [];
    },
  },
});

export const {
  setObjDataWorkingPapper,
  setObjDataMenu,
  resetObjDataWorkingPapper,
  resetObjDataMenu,
} = workingPapperExecutionEWPAgileSlice.actions;

export default workingPapperExecutionEWPAgileSlice.reducer;
