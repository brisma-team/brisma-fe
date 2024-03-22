import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataInfoPAT: {},
  objPayloadRelatedProject: {},
  objPayloadUkerAssessment: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
  },
  resetObjPayloadUkerAssessment: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
    // ref_auditee_orgeh_kode: "",
    // ref_auditee_orgeh_name: "",
    // ref_auditee_branch_kode: "",
    // ref_auditee_branch_name: "",
    // tipe_uker: "",
    // attachments: [""],
    // deskripsi: "",
  },
};

export const infoEWPKonsultingSlice = createSlice({
  name: "infoEWPKonsulting",
  initialState,
  reducers: {
    setObjDataInfoPAT: (state, action) => {
      state.objDataInfoPAT = action.payload;
    },
    setObjPayloadRelatedProject: (state, action) => {
      state.objPayloadRelatedProject = action.payload;
    },
    setObjPayloadUkerAssessment: (state, action) => {
      state.objPayloadUkerAssessment = action.payload;
    },
    resetObjDataInfoPAT: (state) => {
      state.objDataInfoPAT = {};
    },
    resetObjPayloadRelatedProject: (state) => {
      state.objPayloadRelatedProject = {};
    },
    resetObjPayloadUkerAssessment: (state) => {
      state.objPayloadUkerAssessment = {
        ...state.resetObjPayloadUkerAssessment,
      };
    },
  },
});

export const {
  setObjDataInfoPAT,
  setObjPayloadRelatedProject,
  setObjPayloadUkerAssessment,
  resetObjDataInfoPAT,
  resetObjPayloadRelatedProject,
  resetObjPayloadUkerAssessment,
} = infoEWPKonsultingSlice.actions;

export default infoEWPKonsultingSlice.reducer;
