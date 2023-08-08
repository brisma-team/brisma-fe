import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParamObject: {},
  selectedUser: {},
};

export const projectOverviewSlice = createSlice({
  name: "projectOverview",
  initialState,
  reducers: {
    setSearchParamObject: (state, action) => {
      state.searchParamObject = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSearchParam, setSelectedUser } = projectOverviewSlice.actions;

export default projectOverviewSlice.reducer;
