import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auditorInfo: {
    kta: [],
    initiator: {},
  },
};

export const auditorInfoEWPSlice = createSlice({
  name: "auditorInfoEWP",
  initialState,
  reducers: {
    setAuditorInfo: (state, action) => {
      state.auditorInfo = action.payload;
    },
  },
});

export const { setAuditorInfo } = auditorInfoEWPSlice.actions;

export default auditorInfoEWPSlice.reducer;
