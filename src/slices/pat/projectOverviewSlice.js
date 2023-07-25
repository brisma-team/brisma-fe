import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParamObject: {},
  searchParam: {
    pages: 1,
    limit: 8,
    project_name: "",
    status_approver: null,
    status_pat: null,
    sortBy: "",
    year: "",
  },
  selectedUser: {},
};

export const projectOverviewSlice = createSlice({
  name: "projectOverview",
  initialState,
  reducers: {
    setSearchParamObject: (state, action) => {
      state.searchParamObject = action.payload;
    },
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSearchParam, setSearchParamObject, setSelectedUser } =
  projectOverviewSlice.actions;

export default projectOverviewSlice.reducer;
