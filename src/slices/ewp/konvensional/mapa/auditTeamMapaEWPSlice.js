import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auditTeamData: {
    ref_tipe_tim: {
      kode: "",
      nama: "",
    },
    tim_audit: {
      ma: [],
      kta: [],
      ata: [],
    },
  },
  validationErrors: {},
};

export const auditTeamMapaEWPSlice = createSlice({
  name: "auditTeamMapaEWP",
  initialState,
  reducers: {
    setAuditTeamData: (state, action) => {
      state.auditTeamData = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
});

export const { setAuditTeamData, setValidationErrors, resetValidationErrors } =
  auditTeamMapaEWPSlice.actions;

export default auditTeamMapaEWPSlice.reducer;
