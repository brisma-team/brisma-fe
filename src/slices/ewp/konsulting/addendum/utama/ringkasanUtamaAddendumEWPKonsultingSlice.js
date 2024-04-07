import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataRingkasan: [],
  objDataRingkasanDetail: {},
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
  resetObjPayloadRingkasan: {
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

export const ringkasanUtamaAddendumEWPKonsultingSlice = createSlice({
  name: "ringkasanUtamaAddendumEWPKonsulting",
  initialState,
  reducers: {
    setObjDataRingkasan: (state, action) => {
      state.objDataRingkasan = action.payload;
    },
    setObjDataRingkasanDetail: (state, action) => {
      state.objDataRingkasanDetail = action.payload;
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
    resetObjDataRingkasanDetail: (state) => {
      state.objDataRingkasanDetail = {};
    },
    resetObjPayloadRingkasan: (state) => {
      state.objPayloadRingkasan = { ...state.resetObjPayloadRingkasan };
    },
    resetValidationErrorsRingkasan: (state) => {
      state.validationErrorsRingkasan = {};
    },
  },
});

export const {
  setObjDataRingkasan,
  setObjDataRingkasanDetail,
  setObjPayloadRingkasan,
  setValidationErrorsRingkasan,
  resetObjDataRingkasan,
  resetObjDataRingkasanDetail,
  resetObjPayloadRingkasan,
  resetValidationErrorsRingkasan,
} = ringkasanUtamaAddendumEWPKonsultingSlice.actions;

export default ringkasanUtamaAddendumEWPKonsultingSlice.reducer;
