import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {},
};

export const pelaksanaanEWPQualityAssuranceSlice = createSlice({
  name: "pelaksaanEWPQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = [];
    },
  },
});

export const { setObjData, setObjPayload, resetObjData, resetObjPayload } =
  pelaksanaanEWPQualityAssuranceSlice.actions;

export default pelaksanaanEWPQualityAssuranceSlice.reducer;
