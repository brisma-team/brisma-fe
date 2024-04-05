import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataRingkasan: [],
  objPayloadRingkasan: {
    id: "",
    addendum_id: "",
    part: "",
    keterangan: "",
    alasan: "",
    note_sebelum: "",
    note_sesudah: "",
    module: "",
  },
  defaultObjPayloadRingkasan: {
    id: "",
    addendum_id: "",
    part: "",
    keterangan: "",
    alasan: "",
    note_sebelum: "",
    note_sesudah: "",
    module: "",
  },
  validationErrorsRingkasan: {},
};

export const ringkasanSBPAddendumSlice = createSlice({
  name: "ringkasanSBPAddendum",
  initialState,
  reducers: {
    setObjDataRingkasan: (state, action) => {
      state.objDataRingkasan = action.payload;
    },
    setObjPayloadRingkasan: (state, action) => {
      state.objPayloadRingkasan = action.payload;
    },
    setValidationErrorsRingkasan: (state, action) => {
      state.validationErrorsRingkasan = action.payload;
    },
    resetObjDataRingkasan: (state) => {
      state.objDataRingkasan = [];
    },
    resetObjPayloadRingkasan: (state) => {
      state.objPayloadRingkasan = { ...state.defaultObjPayloadRingkasan };
    },
    resetValidationErrorsRingkasan: (state) => {
      state.validationErrorsRingkasan = {};
    },
  },
});

export const {
  setObjDataRingkasan,
  setObjPayloadRingkasan,
  setValidationErrorsRingkasan,
  resetObjDataRingkasan,
  resetObjPayloadRingkasan,
  resetValidationErrorsRingkasan,
} = ringkasanSBPAddendumSlice.actions;

export default ringkasanSBPAddendumSlice.reducer;
