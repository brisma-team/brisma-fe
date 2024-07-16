import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataSprintPlanning: [],
  objDataUserStory: [],
  objDataUkerAssessment: [],
  objPayloadSprint: {},
  objPayloadUserStory: [],
  objPayloadTask: {},
  objPayloadUkerAssessment: {},
  objPayloadCommentTask: "",
  objPayloadCommentUserStory: "",
  validationErrorsSprint: {},
  validationErrorsUserStory: {},
  validationErrorsTask: {},
  validationErrorsUkerAssessment: {},
};

export const sprintPlanningEWPAgileSlice = createSlice({
  name: "sprintPlanningEWPAgile",
  initialState,
  reducers: {
    setObjDataSprintPlanning: (state, action) => {
      state.objDataSprintPlanning = action.payload;
    },
    setObjDataUserStory: (state, action) => {
      state.objDataUserStory = action.payload;
    },
    setObjDataUkerAssessment: (state, action) => {
      state.objDataUkerAssessment = action.payload;
    },
    setObjPayloadSprint: (state, action) => {
      state.objPayloadSprint = action.payload;
    },
    setObjPayloadUserStory: (state, action) => {
      state.objPayloadUserStory = action.payload;
    },
    setObjPayloadTask: (state, action) => {
      state.objPayloadTask = action.payload;
    },
    setObjPayloadUkerAssessment: (state, action) => {
      state.objPayloadUkerAssessment = action.payload;
    },
    setObjPayloadCommentTask: (state, action) => {
      state.objPayloadCommentTask = action.payload;
    },
    setObjPayloadCommentUserStory: (state, action) => {
      state.objPayloadCommentUserStory = action.payload;
    },
    setValidationErrorsSprint: (state, action) => {
      state.validationErrorsSprint = action.payload;
    },
    setValidationErrorsUserStory: (state, action) => {
      state.validationErrorsUserStory = action.payload;
    },
    setValidationErrorsTask: (state, action) => {
      state.validationErrorsTask = action.payload;
    },
    setValidationErrorsUkerAssessment: (state, action) => {
      state.validationErrorsUkerAssessment = action.payload;
    },
    resetObjDataSprintPlanning: (state) => {
      state.objDataSprintPlanning = [];
    },
    resetObjDataUserStory: (state) => {
      state.objDataUserStory = [];
    },
    resetObjDataUkerAssessment: (state) => {
      state.objDataUkerAssessment = [];
    },
    resetObjPayloadSprint: (state) => {
      state.objPayloadSprint = {};
    },
    resetObjPayloadUserStory: (state) => {
      state.objPayloadUserStory = [];
    },
    resetObjPayloadTask: (state) => {
      state.objPayloadTask = {};
    },
    resetObjPayloadUkerAssessment: (state) => {
      state.objPayloadUkerAssessment = {};
    },
    resetObjPayloadCommentTask: (state) => {
      state.objPayloadCommentTask = "";
    },
    resetObjPayloadCommentUserStory: (state) => {
      state.objPayloadCommentUserStory = "";
    },
    resetValidationErrorsSprint: (state) => {
      state.validationErrorsSprint = {};
    },
    resetValidationErrorsUserStory: (state) => {
      state.validationErrorsUserStory = {};
    },
    resetValidationErrorsTask: (state) => {
      state.validationErrorsTask = {};
    },
    resetValidationErrorsUkerAssessment: (state) => {
      state.validationErrorsUkerAssessment = {};
    },
  },
});

export const {
  setObjDataSprintPlanning,
  setObjDataUserStory,
  setObjDataUkerAssessment,
  setObjPayloadSprint,
  setObjPayloadUserStory,
  setObjPayloadTask,
  setObjPayloadUkerAssessment,
  setObjPayloadCommentTask,
  setObjPayloadCommentUserStory,
  setValidationErrorsSprint,
  setValidationErrorsUserStory,
  setValidationErrorsTask,
  setValidationErrorsUkerAssessment,
  resetObjDataSprintPlanning,
  resetObjDataUserStory,
  resetObjDataUkerAssessment,
  resetObjPayloadSprint,
  resetObjPayloadUserStory,
  resetObjPayloadTask,
  resetObjPayloadUkerAssessment,
  resetObjPayloadCommentTask,
  resetObjPayloadCommentUserStory,
  resetValidationErrorsSprint,
  resetValidationErrorsUserStory,
  resetValidationErrorsTask,
  resetValidationErrorsUkerAssessment,
} = sprintPlanningEWPAgileSlice.actions;

export default sprintPlanningEWPAgileSlice.reducer;
