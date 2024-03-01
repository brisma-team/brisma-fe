import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    deadline: "",
    desc: "",
  },
  defaultObjPayload: {
    deadline: "",
    desc: "",
  },
  validationErrors: {},
};

export const rekomendasiEWPKonsultingSlice = createSlice({
  name: "rekomendasiEWPKonsulting",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = { ...state.defaultObjPayload };
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} = rekomendasiEWPKonsultingSlice.actions;

export default rekomendasiEWPKonsultingSlice.reducer;
