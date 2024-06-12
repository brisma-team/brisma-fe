import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataActionPlan: [],
};

export const summaryRPMQualityAssuranceSlice = createSlice({
  name: "summaryRPMQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataActionPlan: (state, action) => {
      state.objDataActionPlan = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjDataActionPlan: (state) => {
      state.objDataActionPlan = [];
    },
  },
});

export const {
  setObjData,
  setObjDataActionPlan,
  resetObjData,
  resetObjDataActionPlan,
} = summaryRPMQualityAssuranceSlice.actions;

export default summaryRPMQualityAssuranceSlice.reducer;
