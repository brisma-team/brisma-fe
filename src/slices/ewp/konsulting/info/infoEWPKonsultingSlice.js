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
  objPayloadUkerAssessment: {
    branch: "",
    orgeh: "",
    tipe_uker: "",
    deskripsi: "",
    attachments: [""],
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
  validationErrorsEditProject: {},
};

export const infoEWPKonsultingSlice = createSlice({
  name: "infoEWPKonsulting",
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
    setObjPayloadUkerAssessment: (state, action) => {
      state.objPayloadUkerAssessment = action.payload;
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
    resetObjPayloadUkerAssessment: (state) => {
      state.objPayloadUkerAssessment = {
        ...state.resetObjPayloadUkerAssessment,
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
  setObjPayloadEditProject,
  setObjPayloadRelatedProject,
  setObjPayloadUkerAssessment,
  setValidationErrorsRelatedProject,
  setValidationErrorsEditProject,
  resetObjDataInfoPAT,
  resetObjPayloadEditProject,
  resetObjPayloadRelatedProject,
  resetObjPayloadUkerAssessment,
  resetValidationErrorsRelatedProject,
  resetValidationErrorsEditProject,
} = infoEWPKonsultingSlice.actions;

export default infoEWPKonsultingSlice.reducer;
