import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataUserStory: {},
  objDataTask: [],
  objDataTeam: [],
  objPayload: {},
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
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
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
    resetObjPayload: (state) => {
      state.objPayload = {};
    },
  },
});

export const {
  setObjDataUserStory,
  setObjDataTask,
  setObjDataTeam,
  setObjPayload,
  resetObjDataUserStory,
  resetObjDataTask,
  resetObjDataTeam,
  resetObjPayload,
} = storyPointDetailEWPAgileSlice.actions;

export default storyPointDetailEWPAgileSlice.reducer;
