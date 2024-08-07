import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: {},
  objPayload: "",
};

export const conclusionExecutionEWPAgileSlice = createSlice({
  name: "conclusionExecutionEWPAgile",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    resetObjData: (state) => {
      state.objData = {};
    },
    resetObjPayload: (state) => {
      state.objPayload = "";
    },
  },
});

export const { setObjData, setObjPayload, resetObjData, resetObjPayload } =
  conclusionExecutionEWPAgileSlice.actions;

export default conclusionExecutionEWPAgileSlice.reducer;
