import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: [],
};

export const auditBacklogEWPAgileSlice = createSlice({
  name: "auditBacklogEWPAgile",
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
  auditBacklogEWPAgileSlice.actions;

export default auditBacklogEWPAgileSlice.reducer;
