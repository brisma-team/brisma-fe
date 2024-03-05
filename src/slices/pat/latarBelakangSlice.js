import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageClipList: [],
  lampiranList: [],
  historyList: []
};

export const latarBelakangSlice = createSlice({
  name: "latarBelakang",
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

export const { setImageClipList, setLampiranList, setHistoryList } = latarBelakangSlice.actions;

export default latarBelakangSlice.reducer;
