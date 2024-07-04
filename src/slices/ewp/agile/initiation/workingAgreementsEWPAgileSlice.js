import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataValue: "",
  objDataEvent: "",
  objDataFormatOfCommunication: "",
  objDataSettingExpectations: "",
  objDataEscalationPoints: "",
  objDataOtherMatters: "",
  objDataRoles: [],
  objPayloadValue: "",
  objPayloadEvent: "",
  objPayloadFormatOfCommunication: "",
  objPayloadSettingExpectations: "",
  objPayloadEscalationPoints: "",
  objPayloadOtherMatters: "",
};

export const workingAgreementsEWPAgileSlice = createSlice({
  name: "workingAgreementsEWPAgile",
  initialState,
  reducers: {
    setObjDataValue: (state, action) => {
      state.objDataValue = action.payload;
    },
    setObjDataEvent: (state, action) => {
      state.objDataEvent = action.payload;
    },
    setObjDataFormatOfCommunication: (state, action) => {
      state.objDataFormatOfCommunication = action.payload;
    },
    setObjDataSettingExpectations: (state, action) => {
      state.objDataSettingExpectations = action.payload;
    },
    setObjDataEscalationPoints: (state, action) => {
      state.objDataEscalationPoints = action.payload;
    },
    setObjDataOtherMatters: (state, action) => {
      state.objDataOtherMatters = action.payload;
    },
    setObjDataRoles: (state, action) => {
      state.objDataRoles = action.payload;
    },
    setObjPayloadValue: (state, action) => {
      state.objPayloadValue = action.payload;
    },
    setObjPayloadEvent: (state, action) => {
      state.objPayloadEvent = action.payload;
    },
    setObjPayloadFormatOfCommunication: (state, action) => {
      state.objPayloadFormatOfCommunication = action.payload;
    },
    setObjPayloadSettingExpectations: (state, action) => {
      state.objPayloadSettingExpectations = action.payload;
    },
    setObjPayloadEscalationPoints: (state, action) => {
      state.objPayloadEscalationPoints = action.payload;
    },
    setObjPayloadOtherMatters: (state, action) => {
      state.objPayloadOtherMatters = action.payload;
    },
    resetObjDataRoles: (state) => {
      state.objDataRoles = [];
    },
    resetObjPayloadValue: (state) => {
      state.objPayloadValue = "";
    },
    resetObjPayloadEvent: (state) => {
      state.objPayloadEvent = "";
    },
    resetObjPayloadFormatOfCommunication: (state) => {
      state.objPayloadFormatOfCommunication = "";
    },
    resetObjPayloadSettingExpectations: (state) => {
      state.objPayloadSettingExpectations = "";
    },
    resetObjPayloadEscalationPoints: (state) => {
      state.objPayloadEscalationPoints = "";
    },
    resetObjPayloadOtherMatters: (state) => {
      state.objPayloadOtherMatters = "";
    },
  },
});

export const {
  setObjDataValue,
  setObjDataEvent,
  setObjDataFormatOfCommunication,
  setObjDataSettingExpectations,
  setObjDataEscalationPoints,
  setObjDataOtherMatters,
  setObjDataRoles,
  setObjPayloadValue,
  setObjPayloadEvent,
  setObjPayloadFormatOfCommunication,
  setObjPayloadSettingExpectations,
  setObjPayloadEscalationPoints,
  setObjPayloadOtherMatters,
  resetObjDataRoles,
  resetObjPayloadValue,
  resetObjPayloadEvent,
  resetObjPayloadFormatOfCommunication,
  resetObjPayloadSettingExpectations,
  resetObjPayloadEscalationPoints,
  resetObjPayloadOtherMatters,
} = workingAgreementsEWPAgileSlice.actions;

export default workingAgreementsEWPAgileSlice.reducer;
