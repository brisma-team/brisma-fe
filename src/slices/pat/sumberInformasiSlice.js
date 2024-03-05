import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageClipList: [],
  lampiranList: [],
  historyList: []
};

export const sumberInformasiSlice = createSlice({
  name: "sumberInformasi",
  initialState,
  reducers: {
    setImageClipList: (state, action) => {
      state.imageClipList = action.payload;
    },
    setLampiranList: (state, action) => {
      state.lampiranList = action.payload
    },
    setHistoryList: (state, action) => {
      state.historyList = action.payload
    }
  },
});

export const { setImageClipList, setLampiranList, setHistoryList } = sumberInformasiSlice.actions;

export default sumberInformasiSlice.reducer;
