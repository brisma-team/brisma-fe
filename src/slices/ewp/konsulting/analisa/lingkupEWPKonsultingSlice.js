import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  validationErrors: {},
};

export const lingkupEWPKonsultingSlice = createSlice({
  name: "lingkupEWPKonsulting",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
  },
});

export const { setObjData, resetObjData } = lingkupEWPKonsultingSlice.actions;

export default lingkupEWPKonsultingSlice.reducer;
