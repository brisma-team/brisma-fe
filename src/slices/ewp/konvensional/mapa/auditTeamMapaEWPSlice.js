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
};

export const auditTeamMapaEWPSlice = createSlice({
  name: "auditTeamMapaEWP",
  initialState,
  reducers: {
    setAuditTeamData: (state, action) => {
      state.auditTeamData = action.payload;
    },
  },
});

export const { setAuditTeamData } = auditTeamMapaEWPSlice.actions;

export default auditTeamMapaEWPSlice.reducer;
