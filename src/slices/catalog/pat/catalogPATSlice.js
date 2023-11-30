import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParamObjectCAT: {},
};

export const catalogPATSlice = createSlice({
  name: "catalogPAT",
  initialState,
  reducers: {
    setSearchParamsCATPAT: (state, action) => {
      state.searchParamObjectCAT = action.payload;
    },
  },
});

export const { setSearchParamsCATPAT } = catalogPATSlice.actions;

export default catalogPATSlice.reducer;
