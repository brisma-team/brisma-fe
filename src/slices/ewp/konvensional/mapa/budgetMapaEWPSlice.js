import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payload: {
    stc_mapa_tipe_anggaran_kode: "",
    tipe_anggaran_name: "",
    tanggal: "",
    tanggal_end: "",
    amount: 0,
    deskripsi: "",
  },
  defaultPayload: {
    stc_mapa_tipe_anggaran_kode: "",
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
