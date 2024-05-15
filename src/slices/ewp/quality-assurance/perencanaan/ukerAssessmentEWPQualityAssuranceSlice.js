import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objData: [],
  objPayload: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
  },
  resetObjPayload: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
  },
};

export const ukerAssessmentEWPQualityAssuranceSlice = createSlice({
  name: "ukerAssessmentEWPQualityAssurance",
  initialState,
  reducers: {
    setObjData: (state, action) => {
      state.objData = action.payload;
    },
    setObjPayload: (state, action) => {
      state.objPayload = action.payload;
    },
    resetObjData: (state) => {
      state.objData = [];
    },
    resetObjPayload: (state) => {
      state.objPayload = {
        ...state.resetObjPayload,
      };
    },
  },
});

export const { setObjData, setObjPayload, resetObjData, resetObjPayload } =
  ukerAssessmentEWPQualityAssuranceSlice.actions;

export default ukerAssessmentEWPQualityAssuranceSlice.reducer;
