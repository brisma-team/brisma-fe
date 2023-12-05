import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {},
};

export const penilaianSurveySlice = createSlice({
  name: "penilaianSurvey",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
  },
});

export const { setObjData } = penilaianSurveySlice.actions;

export default penilaianSurveySlice.reducer;
