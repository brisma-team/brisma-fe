import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParamObjectCAT: {},
};

export const catalogRPMSlice = createSlice({
  name: "catalogRPM",
  initialState,
  reducers: {
    setSearchParamsCATRPM: (state, action) => {
      state.searchParamObjectCAT = action.payload;
    },
  },
});

export const { setSearchParamsCATRPM } = catalogRPMSlice.actions;

export default catalogRPMSlice.reducer;
