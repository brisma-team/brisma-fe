import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataAll: [],
  objDataSelect: [],
  objDataUnselect: [],
  objPayload: [],
};

export const storyAggregationSelectedEWPAgileSlice = createSlice({
  name: "storyAggregationSelectedEWPAgile",
  initialState,
  reducers: {
    setObjDataAll: (state, action) => {
      state.objDataAll = action.payload;
    },
    setObjDataSelect: (state, action) => {
      state.objDataSelect = action.payload;
    },
    setObjDataUnselect: (state, action) => {
      state.objDataUnselect = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    resetObjDataAll: (state) => {
      state.objDataAll = [];
    },
    resetObjDataSelect: (state) => {
      state.objDataSelect = [];
    },
    resetObjDataUnselect: (state) => {
      state.objDataUnselect = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = [];
    },
  },
});

export const {
  setObjDataAll,
  setObjDataSelect,
  setObjDataUnselect,
  setObjPayload,
  resetObjDataAll,
  resetObjDataSelect,
  resetObjDataUnselect,
  resetObjPayload,
} = storyAggregationSelectedEWPAgileSlice.actions;

export default storyAggregationSelectedEWPAgileSlice.reducer;
