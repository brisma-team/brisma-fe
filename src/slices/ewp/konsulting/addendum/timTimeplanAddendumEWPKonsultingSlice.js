import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objPayloadTimTimeplan: {
    initiator: [],
    auditor: [],
    auditee: [],
    ata: [],
  },
  resetObjPayloadTimTimeplan: {
    initiator: [],
    auditor: [],
    auditee: [],
    ata: [],
  },
  validationErrorsTimTimeplan: {},
};

export const timTimeplanEWPKonsultingSlice = createSlice({
  name: "timTimeplanEWPKonsulting",
  initialState,
  reducers: {
    setObjPayloadTimTimeplan: (state, action) => {
      state.objPayloadTimTimeplan = action.payload;
    },
    setValidationErrorsTimTimeplan: (state, action) => {
      state.validationErrorsTimTimeplan = action.payload;
    },
    resetObjPayloadTimTimeplan: (state) => {
      state.objPayloadTimTimeplan = { ...state.resetObjPayloadTimTimeplan };
    },
    resetValidationErrorsTimTimeplan: (state) => {
      state.validationErrorsTimTimeplan = {};
    },
  },
});

export const {
  setObjPayloadTimTimeplan,
  setValidationErrorsTimTimeplan,
  resetObjPayloadTimTimeplan,
  resetValidationErrorsTimTimeplan,
} = timTimeplanEWPKonsultingSlice.actions;

export default timTimeplanEWPKonsultingSlice.reducer;
