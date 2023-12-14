import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {},
};

export const penilaianRespondenSurveySlice = createSlice({
  name: "penilaianRespondenSurvey",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
  },
});

export const { setObjData } = penilaianRespondenSurveySlice.actions;

export default penilaianRespondenSurveySlice.reducer;
