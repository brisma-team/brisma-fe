import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchParamObject: {},
  searchParam: "",
  selectedUser: {},
};

export const jadwalAuditSlice = createSlice({
  name: "jadwalAudit",
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
  jadwalAuditSlice.actions;

export default jadwalAuditSlice.reducer;
