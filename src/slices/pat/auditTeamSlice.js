import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParam: {},
};

export const auditTeamSlice = createSlice({
  name: "auditTeam",
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
  },
});

export const { setSearchParam } = auditTeamSlice.actions;

export default auditTeamSlice.reducer;
