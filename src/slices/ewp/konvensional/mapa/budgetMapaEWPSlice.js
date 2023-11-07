import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payload: {
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
  defaultPayload: {
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
};

export const budgetMapaEWPSlice = createSlice({
  name: "budgetMapaEWP",
  initialState,
  reducers: {
    setPayload: (state, action) => {
      state.payload = action.payload;
    },
    resetPayload: (state) => {
      state.dataTables = { ...state.defaultPayload };
    },
  },
});

export const { setPayload, resetPayload } = budgetMapaEWPSlice.actions;

export default budgetMapaEWPSlice.reducer;
