import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objDataProjectEWPList: [],
  objPayload: {},
  validationErrors: {},
};

export const overviewRPMQualityAssuranceSlice = createSlice({
  name: "overviewRPMQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjDataProjectEWPList: (state, action) => {
      state.objDataProjectEWPList = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjDataProjectEWPList: (state) => {
      state.objDataProjectEWPList = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = {};
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjDataProjectEWPList,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataProjectEWPList,
  resetObjPayload,
  resetValidationErrors,
} = overviewRPMQualityAssuranceSlice.actions;

export default overviewRPMQualityAssuranceSlice.reducer;
