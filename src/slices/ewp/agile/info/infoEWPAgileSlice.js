import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objDataInfoPAT: {},
  objPayloadEditProject: {
    project_name: "",
    info_periode_pelaksanaan_start: "",
    info_periode_pelaksanaan_end: "",
    no_surat: "",
    perihal: "",
    tanggal_surat: "",
    url_file_surat: "",
    nama_file_surat: "",
  },
  objPayloadRelatedProject: {
    project_id: "",
    project_name: "",
    is_new: true,
  },
  resetObjPayloadEditProject: {
    project_name: "",
    info_periode_pelaksanaan_start: "",
    info_periode_pelaksanaan_end: "",
    no_surat: "",
    perihal: "",
    tanggal_surat: "",
    url_file_surat: "",
    nama_file_surat: "",
  },
  resetObjPayloadRelatedProject: {
    project_id: "",
    project_name: "",
    is_new: true,
  },
  validationErrorsRelatedProject: {},
  validationErrorsEditProject: {},
};

export const infoEWPAgileSlice = createSlice({
  name: "infoEWPAgile",
  initialState,
  reducers: {
    setObjDataInfoPAT: (state, action) => {
      state.objDataInfoPAT = action.payload;
    },
    setObjPayloadEditProject: (state, action) => {
      state.objPayloadEditProject = action.payload;
    },
    setObjPayloadRelatedProject: (state, action) => {
      state.objPayloadRelatedProject = action.payload;
    },
    setValidationErrorsRelatedProject: (state, action) => {
      state.validationErrorsRelatedProject = action.payload;
    },
    setValidationErrorsEditProject: (state, action) => {
      state.validationErrorsEditProject = action.payload;
    },
    resetObjDataInfoPAT: (state) => {
      state.objDataInfoPAT = {};
    },
    resetObjPayloadEditProject: (state) => {
      state.objPayloadEditProject = {
        ...state.resetObjPayloadEditProject,
      };
    },
    resetObjPayloadRelatedProject: (state) => {
      state.objPayloadRelatedProject = {
        ...state.resetObjPayloadRelatedProject,
      };
    },
    resetValidationErrorsRelatedProject: (state) => {
      state.validationErrorsRelatedProject = {};
    },
    resetValidationErrorsEditProject: (state) => {
      state.validationErrorsEditProject = {};
    },
  },
});

export const {
  setObjDataInfoPAT,
  setObjPayloadTemplateSurvey,
  setObjPayloadEditProject,
  setObjPayloadRelatedProject,
  setValidationErrorsRelatedProject,
  setValidationErrorsEditProject,
  resetObjDataInfoPAT,
  resetObjPayloadTemplateSurvey,
  resetObjPayloadEditProject,
  resetObjPayloadRelatedProject,
  resetValidationErrorsRelatedProject,
  resetValidationErrorsEditProject,
} = infoEWPAgileSlice.actions;

export default infoEWPAgileSlice.reducer;
