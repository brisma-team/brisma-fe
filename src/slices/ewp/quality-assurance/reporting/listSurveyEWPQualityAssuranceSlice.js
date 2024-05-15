import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
};

export const listSurveyEWPQualityAssuranceSlice = createSlice({
  name: "listSurveyEWPQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
  },
});

export const { setObjData, resetObjData } =
  listSurveyEWPQualityAssuranceSlice.actions;

export default listSurveyEWPQualityAssuranceSlice.reducer;
