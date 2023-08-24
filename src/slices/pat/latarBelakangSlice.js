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

export const latarBelakangSlice = createSlice({
  name: "latarBelakang",
  initialState,
  reducers: {
    setImageClipList: (state, action) => {
      state.imageClipList = action.payload;
    },
  },
});

export const { setImageClipList } = latarBelakangSlice.actions;

export default latarBelakangSlice.reducer;
