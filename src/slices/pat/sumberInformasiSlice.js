import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageClipList: [],
};

export const sumberInformasiSlice = createSlice({
  name: "sumberInformasi",
  initialState,
  reducers: {
    setImageClipList: (state, action) => {
      state.imageClipList = action.payload;
    },
  },
});

export const { setImageClipList } = sumberInformasiSlice.actions;

export default sumberInformasiSlice.reducer;
