import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataUserStory: {},
  objDataTask: [],
  objPayloadTask: {},
  objPayloadSelectedSample: {},
};

export const designEffectivenessExecutionEWPAgileSlice = createSlice({
  name: "designEffectivenessExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataUserStory: (state, action) => {
      state.objDataUserStory = action.payload;
    },
    setObjDataTask: (state, action) => {
      state.objDataTask = action.payload;
    },
    setObjPayloadTask: (state, action) => {
      state.objPayloadTask = action.payload;
    },
    setObjPayloadSelectedSample: (state, action) => {
      state.objPayloadSelectedSample = action.payload;
    },
    resetObjDataUserStory: (state) => {
      state.objDataUserStory = {};
    },
    resetObjDataTask: (state) => {
      state.objDataTask = [];
    },
    resetObjPayloadTask: (state) => {
      state.objPayloadTask = {};
    },
    resetObjPayloadSelectedSample: (state) => {
      state.objPayloadSelectedSample = [];
    },
  },
});

export const {
  setObjDataUserStory,
  setObjDataTask,
  setObjPayloadTask,
  setObjPayloadSelectedSample,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjPayloadTask,
  resetObjPayloadSelectedSample,
} = designEffectivenessExecutionEWPAgileSlice.actions;

export default designEffectivenessExecutionEWPAgileSlice.reducer;
