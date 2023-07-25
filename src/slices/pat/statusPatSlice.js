import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParam: {},
};

export const statusPatSlice = createSlice({
  name: "statusPat",
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
  },
});

export const { setSearchParam } = statusPatSlice.actions;

export default statusPatSlice.reducer;
