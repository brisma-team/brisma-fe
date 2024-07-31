import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataUserStory: {},
  objDataTask: [],
  objDataTeam: [],
  objPayloadTask: {},
  objPayloadCommentTask: "",
};

export const storyPointDetailEWPAgileSlice = createSlice({
  name: "storyPointDetailEWPAgile",
  initialState,
  reducers: {
    setObjDataUserStory: (state, action) => {
      state.objDataUserStory = action.payload;
    },
    setObjDataTask: (state, action) => {
      state.objDataTask = action.payload;
    },
    setObjDataTeam: (state, action) => {
      state.objDataTeam = action.payload;
    },
    setObjPayloadTask: (state, action) => {
      state.objPayloadTask = action.payload;
    },
    setObjPayloadCommentTask: (state, action) => {
      state.objPayloadCommentTask = action.payload;
    },
    resetObjDataUserStory: (state) => {
      state.objDataUserStory = {};
    },
    resetObjDataTask: (state) => {
      state.objDataTask = [];
    },
    resetObjDataTeam: (state) => {
      state.objDataTeam = [];
    },
    resetObjPayloadTask: (state) => {
      state.objPayloadTask = {};
    },
    resetObjPayloadCommentTask: (state) => {
      state.objPayloadCommentTask = "";
    },
  },
});

export const {
  setObjDataUserStory,
  setObjDataTask,
  setObjDataTeam,
  setObjPayloadTask,
  setObjPayloadCommentTask,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjDataTeam,
  resetObjPayloadTask,
  resetObjPayloadCommentTask,
} = storyPointDetailEWPAgileSlice.actions;

export default storyPointDetailEWPAgileSlice.reducer;
