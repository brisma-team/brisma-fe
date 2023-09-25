import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageClipList: [],
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
