import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTables: [],
  tableColumns: [
    "auditor",
    "uker",
    "aktifitas",
    "sub_aktifitas",
    "sub_major",
    "risk_issue",
    "sample",
    "presentase",
  ],
  modalDataTables: {
    tableColumns: [],
    tableRows: [],
  },
};

export const assignmentMapaEWPSlice = createSlice({
  name: "assignmentMapaEWP",
  initialState,
  reducers: {
    setDataTables: (state, action) => {
      state.dataTables = action.payload;
    },
    setModalDataTables: (state, action) => {
      state.modalDataTables = action.payload;
    },
  },
});

export const { setDataTables, setModalDataTables } =
  assignmentMapaEWPSlice.actions;

export default assignmentMapaEWPSlice.reducer;
