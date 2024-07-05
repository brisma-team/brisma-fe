import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataBusinessConcern: "",
  objDataProjectDrivers: "",
  objDataValueProportions: "",
  objDataCrossFunctionalImpact: "",
  objDataAdditionalInformation: "",
  objDataProjectObjectives: "",
  objDataAuditBacklog: "",
  objDataAuditTimelines: [],
  objDataTeam: [],
  objDataUkerAssessment: [],
  objPayloadBusinessConcern: "",
  objPayloadProjectDrivers: "",
  objPayloadValueProportions: "",
  objPayloadCrossFunctionalImpact: "",
  objPayloadAdditionalInformation: "",
  objPayloadProjectObjectives: "",
  objPayloadAuditBacklog: "",
  objPayloadTeam: {},
  objPayloadUkerAssessment: {},
  objPayloadAuditTimelines: {},
  validationErrorsTeam: {},
  validationErrorsUkerAssessment: {},
  validationErrorsAuditTimelines: {},
};

export const auditCanvasEWPAgileSlice = createSlice({
  name: "auditCanvasEWPAgile",
  initialState,
  reducers: {
    setObjDataBusinessConcern: (state, action) => {
      state.objDataBusinessConcern = action.payload;
    },
    setObjDataProjectDrivers: (state, action) => {
      state.objDataProjectDrivers = action.payload;
    },
    setObjDataValueProportions: (state, action) => {
      state.objDataValueProportions = action.payload;
    },
    setObjDataCrossFunctionalImpact: (state, action) => {
      state.objDataCrossFunctionalImpact = action.payload;
    },
    setObjDataAdditionalInformation: (state, action) => {
      state.objDataAdditionalInformation = action.payload;
    },
    setObjDataProjectObjectives: (state, action) => {
      state.objDataProjectObjectives = action.payload;
    },
    setObjDataAuditBacklog: (state, action) => {
      state.objDataAuditBacklog = action.payload;
    },
    setObjDataAuditTimelines: (state, action) => {
      state.objDataAuditTimelines = action.payload;
    },
    setObjDataTeam: (state, action) => {
      state.objDataTeam = action.payload;
    },
    setObjDataUkerAssessment: (state, action) => {
      state.objDataUkerAssessment = action.payload;
    },
    setObjPayloadBusinessConcern: (state, action) => {
      state.objPayloadBusinessConcern = action.payload;
    },
    setObjPayloadProjectDrivers: (state, action) => {
      state.objPayloadProjectDrivers = action.payload;
    },
    setObjPayloadValueProportions: (state, action) => {
      state.objPayloadValueProportions = action.payload;
    },
    setObjPayloadCrossFunctionalImpact: (state, action) => {
      state.objPayloadCrossFunctionalImpact = action.payload;
    },
    setObjPayloadAdditionalInformation: (state, action) => {
      state.objPayloadAdditionalInformation = action.payload;
    },
    setObjPayloadProjectObjectives: (state, action) => {
      state.objPayloadProjectObjectives = action.payload;
    },
    setObjPayloadAuditBacklog: (state, action) => {
      state.objPayloadAuditBacklog = action.payload;
    },
    setObjPayloadTeam: (state, action) => {
      state.objPayloadTeam = action.payload;
    },
    setObjPayloadUkerAssessment: (state, action) => {
      state.objPayloadUkerAssessment = action.payload;
    },
    setObjPayloadAuditTimelines: (state, action) => {
      state.objPayloadAuditTimelines = action.payload;
    },
    setValidationErrorsTeam: (state, action) => {
      state.validationErrorsTeam = action.payload;
    },
    setValidationErrorsUkerAssessment: (state, action) => {
      state.validationErrorsUkerAssessment = action.payload;
    },
    setValidationErrorsAuditTimelines: (state, action) => {
      state.validationErrorsAuditTimelines = action.payload;
    },
    resetObjDataAuditTimelines: (state) => {
      state.objDataAuditTimelines = [];
    },
    resetObjDataTeam: (state) => {
      state.objData = [];
    },
    resetObjDataUkerAssessment: (state) => {
      state.objDataUkerAssessment = [];
    },
    resetObjPayloadBusinessConcern: (state) => {
      state.objPayloadBusinessConcern = "";
    },
    resetObjPayloadProjectDrivers: (state) => {
      state.objPayloadProjectDrivers = "";
    },
    resetObjPayloadValueProportions: (state) => {
      state.objPayloadValueProportions = "";
    },
    resetObjPayloadCrossFunctionalImpact: (state) => {
      state.objPayloadCrossFunctionalImpact = "";
    },
    resetObjPayloadAdditionalInformation: (state) => {
      state.objPayloadAdditionalInformation = "";
    },
    resetObjPayloadProjectObjectives: (state) => {
      state.objPayloadProjectObjectives = "";
    },
    resetObjPayloadAuditBacklog: (state) => {
      state.objPayloadAuditBacklog = "";
    },
    resetObjPayloadTeam: (state) => {
      state.objPayloadTeam = {};
    },
    resetObjPayloadUkerAssessment: (state) => {
      state.objPayloadUkerAssessment = {};
    },
    resetObjPayloadAuditTimelines: (state) => {
      state.objPayloadAuditTimelines = {};
    },
    resetValidationErrorsTeam: (state) => {
      state.validationErrorsTeam = {};
    },
    resetValidationErrorsUkerAssessment: (state) => {
      state.validationErrorsUkerAssessment = {};
    },
    resetValidationErrorsAuditTimelines: (state) => {
      state.validationErrorsAuditTimelines = {};
    },
  },
});

export const {
  setObjDataBusinessConcern,
  setObjDataProjectDrivers,
  setObjDataValueProportions,
  setObjDataCrossFunctionalImpact,
  setObjDataAdditionalInformation,
  setObjDataProjectObjectives,
  setObjDataAuditBacklog,
  setObjDataAuditTimelines,
  setObjDataTeam,
  setObjDataUkerAssessment,
  setObjPayloadBusinessConcern,
  setObjPayloadProjectDrivers,
  setObjPayloadValueProportions,
  setObjPayloadCrossFunctionalImpact,
  setObjPayloadAdditionalInformation,
  setObjPayloadProjectObjectives,
  setObjPayloadAuditBacklog,
  setObjPayloadTeam,
  setObjPayloadUkerAssessment,
  setObjPayloadAuditTimelines,
  setValidationErrorsTeam,
  setValidationErrorsUkerAssessment,
  setValidationErrorsAuditTimelines,
  resetObjDataAuditTimelines,
  resetObjDataTeam,
  resetObjDataUkerAssessment,
  resetObjPayloadBusinessConcern,
  resetObjPayloadProjectDrivers,
  resetObjPayloadValueProportions,
  resetObjPayloadCrossFunctionalImpact,
  resetObjPayloadAdditionalInformation,
  resetObjPayloadProjectObjectives,
  resetObjPayloadAuditBacklog,
  resetObjPayloadTeam,
  resetObjPayloadUkerAssessment,
  resetObjPayloadAuditTimelines,
  resetValidationErrorsTeam,
  resetValidationErrorsUkerAssessment,
  resetValidationErrorsAuditTimelines,
} = auditCanvasEWPAgileSlice.actions;

export default auditCanvasEWPAgileSlice.reducer;
