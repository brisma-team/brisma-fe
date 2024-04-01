import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataInfoPAT: {},
  objPayloadRelatedProject: {
    project_id: "",
    project_name: "",
    is_new: true,
  },
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
  },
  resetObjPayloadRelatedProject: {
    project_id: "",
    project_name: "",
    is_new: true,
  },
  validationErrorsRelatedProject: {},
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
    setValidationErrorsRelatedProject: (state, action) => {
      state.validationErrorsRelatedProject = action.payload;
    },
    resetObjDataInfoPAT: (state) => {
      state.objDataInfoPAT = {};
    },
    resetObjPayloadRelatedProject: (state) => {
      state.objPayloadRelatedProject = {
        ...state.resetObjPayloadRelatedProject,
      };
    },
    resetObjPayloadUkerAssessment: (state) => {
      state.objPayloadUkerAssessment = {
        ...state.resetObjPayloadUkerAssessment,
      };
    },
    resetValidationErrorsRelatedProject: (state) => {
      state.validationErrorsRelatedProject = {};
    },
  },
});

export const {
  setObjDataInfoPAT,
  setObjPayloadRelatedProject,
  setObjPayloadUkerAssessment,
  setValidationErrorsRelatedProject,
  resetObjDataInfoPAT,
  resetObjPayloadRelatedProject,
  resetObjPayloadUkerAssessment,
  resetValidationErrorsRelatedProject,
} = infoEWPKonsultingSlice.actions;

export default infoEWPKonsultingSlice.reducer;
