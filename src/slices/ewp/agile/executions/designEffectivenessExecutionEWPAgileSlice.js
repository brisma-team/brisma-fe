import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataUserStory: {},
  objDataTask: [],
  objDataSample: {},
  objDataNewSampleCSV: {},
  objDataPoolSampleCSV: [],
  objDataNewSampleFile: {},
  objDataPoolSampleFile: [],
  objPayloadTask: {},
  objPayloadSample: [],
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
    setObjDataSample: (state, action) => {
      state.objDataSample = action.payload;
    },
    setObjDataNewSampleCSV: (state, action) => {
      state.objDataNewSampleCSV = action.payload;
    },
    setObjDataPoolSampleCSV: (state, action) => {
      state.objDataPoolSampleCSV = action.payload;
    },
    setObjDataNewSampleFile: (state, action) => {
      state.objDataNewSampleFile = action.payload;
    },
    setObjDataPoolSampleFile: (state, action) => {
      state.objDataPoolSampleFile = action.payload;
    },
    setObjPayloadTask: (state, action) => {
      state.objPayloadTask = action.payload;
    },
    setObjPayloadSample: (state, action) => {
      state.objPayloadSample = action.payload;
    },
    resetObjDataUserStory: (state) => {
      state.objDataUserStory = {};
    },
    resetObjDataTask: (state) => {
      state.objDataTask = [];
    },
    resetObjDataSample: (state) => {
      state.objDataSample = [];
    },
    resetObjDataNewSampleCSV: (state) => {
      state.objDataNewSampleCSV = {};
    },
    resetObjDataPoolSampleCSV: (state) => {
      state.objDataPoolSampleCSV = {};
    },
    resetObjDataNewSampleFile: (state) => {
      state.objDataNewSampleFile = {};
    },
    resetObjDataPoolSampleFile: (state) => {
      state.objDataPoolSampleFile = [];
    },
    resetObjPayloadTask: (state) => {
      state.objPayloadTask = {};
    },
    resetObjPayloadSample: (state) => {
      state.objPayloadSample = [];
    },
    resetObjPayloadUploadSample: (state) => {
      state.objPayloadUploadSample = [];
    },
  },
});

export const {
  setObjDataUserStory,
  setObjDataTask,
  setObjDataSample,
  setObjDataNewSampleCSV,
  setObjDataPoolSampleCSV,
  setObjDataNewSampleFile,
  setObjDataPoolSampleFile,
  setObjPayloadTask,
  setObjPayloadSample,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjDataSample,
  resetObjDataNewSampleCSV,
  resetObjDataPoolSampleCSV,
  resetObjDataNewSampleFile,
  resetObjDataPoolSampleFile,
  resetObjPayloadTask,
  resetObjPayloadSample,
  resetObjPayloadUploadSample,
} = designEffectivenessExecutionEWPAgileSlice.actions;

export default designEffectivenessExecutionEWPAgileSlice.reducer;
