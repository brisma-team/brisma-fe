import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
};

export const pelaksanaanEWPQualityAssuranceSlice = createSlice({
  name: "pelaksaanEWPQualityAssurance",
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
  pelaksanaanEWPQualityAssuranceSlice.actions;

export default pelaksanaanEWPQualityAssuranceSlice.reducer;
