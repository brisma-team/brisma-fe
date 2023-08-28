import { createSlice } from "@reduxjs/toolkit";
import { ImageBrismaHorizontal } from "@/helpers/imagesUrl";
const initialState = {
  imageClipList: [
    {
      name: "brisma",
      url: ImageBrismaHorizontal,
    },
  ],
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
