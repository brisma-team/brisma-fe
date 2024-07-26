import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataSprintPlanning: [],
  objDataUserStory: [],
  objDataUkerAssessment: [],
  objPayloadSprint: {},
  objPayloadUserStory: [],
  objPayloadTask: {},
  objPayloadUkerAssessment: {},
  objPayloadCompletionStatusUserStory: "",
  objPayloadPotentialProblemTask: "",
  objPayloadCommentTask: "",
  validationErrorsSprint: {},
  validationErrorsUserStory: {},
  validationErrorsTask: {},
  validationErrorsUkerAssessment: {},
};

export const sprintExecutionEWPAgileSlice = createSlice({
  name: "sprintExecutionEWPAgile",
  initialState,
  reducers: {
    setObjDataSprintExecution: (state, action) => {
      state.objDataSprintExecution = action.payload;
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
    setObjPayloadCompletionStatusUserStory: (state, action) => {
      state.objPayloadCompletionStatusUserStory = action.payload;
    },
    setObjPayloadPotentialProblemTask: (state, action) => {
      state.objPayloadPotentialProblemTask = action.payload;
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
    resetObjDataSprintExecution: (state) => {
      state.objDataSprintExecution = [];
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
    resetObjPayloadCompletionStatusUserStory: (state) => {
      state.objPayloadCompletionStatusUserStory = "";
    },
    resetObjPayloadPotentialProblemTask: (state) => {
      state.objPayloadPotentialProblemTask = "";
    },
    resetObjPayloadCommentTask: (state) => {
      state.objPayloadCommentTask = "";
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
  setObjDataSprintExecution,
  setObjDataUserStory,
  setObjDataUkerAssessment,
  setObjPayloadSprint,
  setObjPayloadUserStory,
  setObjPayloadTask,
  setObjPayloadUkerAssessment,
  setObjPayloadCompletionStatusUserStory,
  setObjPayloadPotentialProblemTask,
  setObjPayloadCommentTask,
  setValidationErrorsSprint,
  setValidationErrorsUserStory,
  setValidationErrorsTask,
  setValidationErrorsUkerAssessment,
  resetObjDataSprintExecution,
  resetObjDataUserStory,
  resetObjDataUkerAssessment,
  resetObjPayloadSprint,
  resetObjPayloadUserStory,
  resetObjPayloadTask,
  resetObjPayloadUkerAssessment,
  resetObjPayloadCompletionStatusUserStory,
  resetObjPayloadPotentialProblemTask,
  resetObjPayloadCommentTask,
  resetValidationErrorsSprint,
  resetValidationErrorsUserStory,
  resetValidationErrorsTask,
  resetValidationErrorsUkerAssessment,
} = sprintExecutionEWPAgileSlice.actions;

export default sprintExecutionEWPAgileSlice.reducer;
