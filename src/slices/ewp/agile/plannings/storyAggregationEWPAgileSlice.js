import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataTable: [],
  objDataContent: {},
  objPayload: {},
};

export const storyAggregationEWPAgileSlice = createSlice({
  name: "storyAggregationEWPAgile",
  initialState,
  reducers: {
    setObjDataTable: (state, action) => {
      state.objDataTable = action.payload;
    },
    setObjDataContent: (state, action) => {
      state.objDataContent = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    resetObjDataTable: (state) => {
      state.objDataTable = [];
    },
    resetObjDataContent: (state, action) => {
      state.objDataContent = action.payload;
    },
    resetObjPayload: (state) => {
      state.objPayload = { ...state.defaultObjPayload };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjDataTable,
  setObjDataContent,
  setObjPayload,
  resetObjDataTable,
  resetObjDataContent,
  resetObjPayload,
} = storyAggregationEWPAgileSlice.actions;

export default storyAggregationEWPAgileSlice.reducer;
